import fs from 'fs';
import path from 'path';

export function writeJsonOrTs(filePath, content) {
  const fullPath = path.resolve(filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Wrote ' + filePath);
}
