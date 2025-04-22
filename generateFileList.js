const glob = require('glob');
const fs = require('fs');
const path = require('path');

glob('obsidian/**/*.md', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const categories = {};

  files.forEach(file => {
    const relativePath = path.relative('obsidian', file);
    const parts = relativePath.split(path.sep);
    const category = parts[0];
    const fileName = parts.slice(1).join(path.sep);

    if (fileName) { // 자식 디렉토리 바로 아래의 md 파일만 처리
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({ path: fileName, fullPath: relativePath });
    }
  });

  const data = JSON.stringify({ categories: categories }, null, 2);
  fs.writeFileSync('_data/notes.json', data);
  console.log('_data/notes.json generated successfully!');
});
