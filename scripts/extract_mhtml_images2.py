import os
import re
import base64
from pathlib import Path
import quopri

src_dir = Path('src/elgaRU')
out_dir = Path('public/elga-ru')
out_dir.mkdir(parents=True, exist_ok=True)

extracted = []

for mhtml_file in src_dir.glob('*.mhtml'):
    print(f"\nProcessing: {mhtml_file.name}")
    with open(mhtml_file, 'rb') as f:
        raw = f.read()
    
    # Try to decode quoted-printable first
    try:
        content = raw.decode('utf-8', errors='ignore')
    except:
        content = raw.decode('latin-1', errors='ignore')
    
    # Find boundary
    boundary_match = re.search(r'boundary="([^"]+)"', content)
    if not boundary_match:
        boundary_match = re.search(r'boundary=([^\s;]+)', content)
    
    if boundary_match:
        boundary = boundary_match.group(1).strip('"')
        parts = content.split('--' + boundary)
    else:
        parts = [content]
    
    for i, part in enumerate(parts):
        # Look for image parts
        if 'Content-Type: image' not in part:
            continue
        
        # Extract Content-Location or Content-ID
        loc_match = re.search(r'Content-Location:\s*([^\s]+)', part)
        cid_match = re.search(r'Content-ID:\s*<([^>]+)>', part)
        
        url = loc_match.group(1) if loc_match else (cid_match.group(1) if cid_match else f"part_{i}")
        
        # Determine extension
        type_match = re.search(r'Content-Type: image/(\w+)', part)
        ext = '.' + type_match.group(1) if type_match else '.jpg'
        if ext == '.jpeg':
            ext = '.jpg'
        
        # Extract base64 data
        if 'Content-Transfer-Encoding: base64' in part:
            # Find the base64 data after the headers
            header_end = part.find('\n\n')
            if header_end == -1:
                header_end = part.find('\r\n\r\n')
            
            if header_end > 0:
                b64_data = part[header_end+2:].strip()
                # Remove boundary markers and trailing content
                b64_data = re.split(r'\n-+\w', b64_data)[0].strip()
                b64_data = re.sub(r'\s+', '', b64_data)
                
                if len(b64_data) > 100:
                    try:
                        img_data = base64.b64decode(b64_data)
                        # Create filename from URL
                        safe_name = re.sub(r'[^\w\-.]', '_', Path(url).name)
                        if not safe_name or safe_name in ['_', '.', '_jpg', '_png']:
                            safe_name = f"{mhtml_file.stem[:20]}_{i}{ext}"
                        if not safe_name.endswith(ext):
                            safe_name += ext
                        
                        out_path = out_dir / safe_name
                        counter = 1
                        while out_path.exists():
                            stem = Path(safe_name).stem
                            out_path = out_dir / f"{stem}_{counter}{ext}"
                            counter += 1
                        
                        with open(out_path, 'wb') as f:
                            f.write(img_data)
                        extracted.append((url, out_path.name, len(img_data)))
                        print(f"  ✓ {out_path.name} ({len(img_data)} bytes)")
                    except Exception as e:
                        print(f"  ✗ Failed: {url[:50]}... - {e}")

print(f"\n{'='*50}")
print(f"Total extracted: {len(extracted)} images")
print(f"Output directory: {out_dir}")
