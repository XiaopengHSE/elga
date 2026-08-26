from html.parser import HTMLParser
import json
import re
import os

class TelegramMessageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.messages = []
        self.current_message = None
        self.in_message = False
        self.in_text = False
        self.in_media_wrap = False
        self.in_media_title = False
        self.in_media_desc = False
        self.in_media_status = False
        self.in_photo = False
        self.in_date = False
        self.in_from_name = False
        self.in_reactions = False
        self.in_reaction_count = False
        self.current_tag_stack = []
        self.current_text = []
        self.current_media = None
        self.current_photo = None

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.current_tag_stack.append(tag)

        # Start of a message
        if tag == 'div' and attrs_dict.get('class', '').startswith('message default'):
            self.in_message = True
            self.current_message = {
                'id': attrs_dict.get('id', ''),
                'date': '',
                'time': '',
                'from': '',
                'text': '',
                'photos': [],
                'videos': [],
                'reactions': []
            }

        # Date
        elif tag == 'div' and 'date details' in attrs_dict.get('class', '') and self.in_message:
            self.in_date = True
            title = attrs_dict.get('title', '')
            if title:
                # Extract date from title like "20.02.2025 19:50:55 UTC+08:00"
                parts = title.split(' ')
                if len(parts) >= 2:
                    self.current_message['date'] = parts[0]
                    self.current_message['time'] = parts[1]

        # From name
        elif tag == 'div' and attrs_dict.get('class') == 'from_name' and self.in_message:
            self.in_from_name = True

        # Text content
        elif tag == 'div' and attrs_dict.get('class') == 'text' and self.in_message:
            self.in_text = True
            self.current_text = []

        # Media wrap
        elif tag == 'div' and attrs_dict.get('class', '').startswith('media_wrap') and self.in_message:
            self.in_media_wrap = True

        # Photo
        elif tag == 'a' and 'userpic_link' in attrs_dict.get('class', '') and self.in_message:
            href = attrs_dict.get('href', '')
            if href and href.startswith('photos/'):
                self.current_photo = {'type': 'photo', 'src': href}

        elif tag == 'img' and self.current_photo and self.in_message:
            src = attrs_dict.get('src', '')
            if src and 'thumb' in src:
                self.current_photo['thumb'] = src
            else:
                self.current_photo['thumb'] = src

        # Photo in media
        elif tag == 'a' and attrs_dict.get('class') == 'photo_wrap' and self.in_message:
            href = attrs_dict.get('href', '')
            self.current_photo = {'type': 'photo', 'src': href}

        # Video
        elif tag == 'div' and 'media_video' in attrs_dict.get('class', '') and self.in_message:
            self.current_media = {'type': 'video', 'title': '', 'description': '', 'status': ''}

        # Media title
        elif tag == 'div' and attrs_dict.get('class') == 'title bold' and self.current_media:
            self.in_media_title = True

        # Media description
        elif tag == 'div' and attrs_dict.get('class') == 'description' and self.current_media:
            self.in_media_desc = True

        # Media status
        elif tag == 'div' and attrs_dict.get('class') == 'status details' and self.current_media:
            self.in_media_status = True

        # Reactions
        elif tag == 'span' and attrs_dict.get('class') == 'reaction' and self.in_message:
            self.in_reactions = True
            self.current_reaction = {'emoji': '', 'count': 0}

        elif tag == 'span' and attrs_dict.get('class') == 'emoji' and self.in_reactions:
            pass  # Will get text content

        elif tag == 'span' and attrs_dict.get('class') == 'count' and self.in_reactions:
            self.in_reaction_count = True

        # Handle <br> tags in text
        if self.in_text and tag == 'br':
            self.current_text.append('\n')

    def handle_endtag(self, tag):
        if not self.current_tag_stack:
            return

        # Text
        if tag == 'div' and self.in_text:
            self.in_text = False
            if self.current_message:
                text = ''.join(self.current_text).strip()
                # Clean up HTML entities
                text = text.replace('&laquo;', '"').replace('&raquo;', '"')
                text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                self.current_message['text'] = text

        # Date
        elif tag == 'div' and self.in_date:
            self.in_date = False

        # From name
        elif tag == 'div' and self.in_from_name:
            self.in_from_name = False

        # Photo
        elif tag == 'a' and self.current_photo:
            if self.current_photo.get('src'):
                self.current_message['photos'].append(self.current_photo)
            self.current_photo = None

        # Media wrap
        elif tag == 'div' and self.in_media_wrap and tag == 'div':
            # Check if we're closing the media_wrap
            if self.current_media and self.current_media.get('type') == 'video':
                self.current_message['videos'].append(self.current_media)
                self.current_media = None
            self.in_media_wrap = False

        # Video title
        elif tag == 'div' and self.in_media_title:
            self.in_media_title = False

        # Video description
        elif tag == 'div' and self.in_media_desc:
            self.in_media_desc = False

        # Video status
        elif tag == 'div' and self.in_media_status:
            self.in_media_status = False

        # Reaction count
        elif tag == 'span' and self.in_reaction_count:
            self.in_reaction_count = False
            if self.current_reaction and self.current_reaction.get('emoji'):
                self.current_message['reactions'].append(self.current_reaction)
            self.current_reaction = None

        # Reactions
        elif tag == 'span' and self.in_reactions and tag == 'span':
            self.in_reactions = False

        # End of message
        elif tag == 'div' and self.in_message:
            # Check if this closes the message div
            classes = ''
            # We need to track this better
            pass

        if self.current_tag_stack and self.current_tag_stack[-1] == tag:
            self.current_tag_stack.pop()

    def handle_data(self, data):
        if self.in_date and self.current_message:
            # Date text
            pass

        elif self.in_from_name and self.current_message:
            self.current_message['from'] = data.strip()

        elif self.in_text and self.current_message:
            self.current_text.append(data)

        elif self.in_media_title and self.current_media:
            self.current_media['title'] = data.strip()

        elif self.in_media_desc and self.current_media:
            self.current_media['description'] = data.strip()

        elif self.in_media_status and self.current_media:
            self.current_media['status'] = data.strip()

        elif self.in_reactions and not self.in_reaction_count:
            # Emoji
            if hasattr(self, 'current_reaction') and self.current_reaction:
                self.current_reaction['emoji'] = data.strip()

        elif self.in_reaction_count:
            if hasattr(self, 'current_reaction') and self.current_reaction:
                try:
                    self.current_reaction['count'] = int(data.strip())
                except:
                    pass

    def get_messages(self):
        return [m for m in self.messages if m.get('text') or m.get('photos') or m.get('videos')]


# Read HTML file
with open('src/elga telegram channel/messages.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Parse
parser = TelegramMessageParser()
parser.feed(html)

# The parser above doesn't properly track message boundaries.
# Let's use regex approach instead for more reliable extraction.

messages = []

# Find all message blocks
message_pattern = r'<div class="message default clearfix" id="(message\d+)">(.*?)</div>\s*</div>\s*</div>\s*<div class="message default clearfix"|\Z'

# Better approach: extract individual messages
msg_blocks = re.findall(r'<div class="message default clearfix"[^>]*>(.*?)(?=<div class="message (default|service) clearfix"|$)', html, re.DOTALL)

for block_text, _ in msg_blocks:
    msg = {
        'id': '',
        'date': '',
        'time': '',
        'from': 'ELGA',
        'text': '',
        'photos': [],
        'videos': [],
        'reactions': []
    }

    # Extract ID
    id_match = re.search(r'id="(message\d+)"', block_text)
    if id_match:
        msg['id'] = id_match.group(1)

    # Extract date/time
    date_match = re.search(r'title="(\d{2}\.\d{2}\.\d{4})\s+(\d{2}:\d{2}:\d{2})', block_text)
    if date_match:
        msg['date'] = date_match.group(1)
        msg['time'] = date_match.group(2)

    # Extract text
    text_match = re.search(r'<div class="text">(.*?)</div>', block_text, re.DOTALL)
    if text_match:
        text = text_match.group(1)
        # Clean HTML tags
        text = re.sub(r'<br\s*/?>', '\n', text)
        text = re.sub(r'<[^>]+>', '', text)
        text = text.replace('&laquo;', '"').replace('&raquo;', '"')
        text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
        text = text.replace('\n\n', '\n').strip()
        msg['text'] = text

    # Extract photos
    photo_matches = re.findall(r'<a[^>]*href="(photos/[^"]+)"[^>]*>.*?<img[^>]*src="(photos/[^"]+)"', block_text, re.DOTALL)
    for full, thumb in photo_matches:
        # Skip userpics (small profile pics)
        if 'userpic' not in block_text[ block_text.find(full)-200:block_text.find(full)+50 ]:
            msg['photos'].append({'src': full, 'thumb': thumb})

    # Better photo extraction
    photo_wraps = re.findall(r'<a class="photo_wrap"[^>]*href="(photos/[^"]+)"[^>]*>.*?<img[^>]*src="(photos/[^"]+)"', block_text, re.DOTALL)
    for full, thumb in photo_wraps:
        msg['photos'].append({'src': full, 'thumb': thumb})

    # Extract videos
    video_match = re.search(r'<div class="[^"]*media_video[^"]*">.*?<div class="title bold">(.*?)</div>.*?<div class="description">(.*?)</div>.*?<div class="status details">(.*?)</div>', block_text, re.DOTALL)
    if video_match:
        msg['videos'].append({
            'title': video_match.group(1).strip(),
            'description': video_match.group(2).strip(),
            'status': video_match.group(3).strip()
        })

    # Extract reactions
    reaction_matches = re.findall(r'<span class="reaction">\s*<span class="emoji">([^<]+)</span>\s*<span class="count">(\d+)</span>', block_text)
    for emoji, count in reaction_matches:
        msg['reactions'].append({'emoji': emoji.strip(), 'count': int(count)})

    if msg['text'] or msg['photos'] or msg['videos']:
        messages.append(msg)

# Sort by date (newest first)
def parse_date(d):
    if not d:
        return ''
    parts = d.split('.')
    if len(parts) == 3:
        return f"{parts[2]}-{parts[1]}-{parts[0]}"
    return d

messages.sort(key=lambda x: parse_date(x['date']), reverse=True)

# Deduplicate photos
for m in messages:
    seen = set()
    unique = []
    for p in m['photos']:
        if p['src'] not in seen:
            seen.add(p['src'])
            unique.append(p)
    m['photos'] = unique

# Save to JSON
output = {
    'channel': 'ELGA',
    'description': 'Official Telegram channel of Elga Coal Company',
    'messages': messages
}

with open('src/data/telegramNews.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(messages)} messages")
for i, m in enumerate(messages[:5]):
    print(f"\n{i+1}. [{m['date']} {m['time']}] {m['text'][:80]}...")
    print(f"   Photos: {len(m['photos'])}, Videos: {len(m['videos'])}, Reactions: {len(m['reactions'])}")
