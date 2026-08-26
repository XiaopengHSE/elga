import os
import re
import base64
from pathlib import Path

# Source directory
src_dir = Path('src/elgaRU')
# Output directory for extracted images
out_dir = Path('public/elga-ru')
out_dir.mkdir(parents=True, exist_ok=True)

extracted = []

for mhtml_file in src_dir.glob('*.mhtml'):
    with open(mhtml_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all Content-Location and base64 encoded data
    # Pattern: Content-Location: url followed by base64 data
    pattern = r'Content-Location: (https?://[^\s]+)\s+.*?Content-Transfer-Encoding: base64\s+\n\n([A-Za-z0-9+/=\s]+?)(?=\n------|-------|Content-Location:|\Z)'
    
    matches = re.findall(pattern, content, re.DOTALL)
    
    for url, b64_data in matches:
        # Clean base64 data
        b64_clean = re.sub(r'\s+', '', b64_data)
        if len(b64_clean) < 100:
            continue
            
        # Determine file extension from URL
        ext = Path(url).suffix
        if not ext or ext not in ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp']:
            # Try to guess from content type
            type_match = re.search(r'Content-Type: image/(\w+)', content[:content.find(url)+500])
            if type_match:
                ext = '.' + type_match.group(1)
            else:
                ext = '.jpg'
        
        # Create safe filename
        safe_name = re.sub(r'[^\w\-_.]', '_', Path(url).name)
        if not safe_name or safe_name == '_':
            safe_name = f"img_{len(extracted)}" + ext
        
        # Ensure unique name
        out_path = out_dir / safe_name
        counter = 1
        while out_path.exists():
            stem = Path(safe_name).stem
            out_path = out_dir / f"{stem}_{counter}{ext}"
            counter += 1
        
        try:
            img_data = base64.b64decode(b64_clean)
            with open(out_path, 'wb') as f:
                f.write(img_data)
            extracted.append((url, out_path.name, len(img_data)))
            print(f"Extracted: {out_path.name} ({len(img_data)} bytes)")
        except Exception as e:
            print(f"Failed to decode {url}: {e}")

print(f"\nTotal extracted: {len(extracted)} images")
