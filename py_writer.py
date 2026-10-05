import os, sys, base64

def write_b64(path, b64_content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    raw = base64.b64decode(b64_content).decode('utf-8')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(raw)
    print(f"Wrote {path} ({len(raw)} bytes)")

if __name__ == "__main__":
    if len(sys.argv) == 3:
        write_b64(sys.argv[1], sys.argv[2])
