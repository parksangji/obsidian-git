const glob = require('glob');
const fs = require('fs');
const path = require('path');

glob('obsidian/**/*.md', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const fileList = files.map(file => {
    const fileName = path.relative('obsidian', file); // obsidian 디렉토리 기준으로 상대 경로 생성
    return { path: fileName };
  });

  const data = JSON.stringify({ files: fileList }, null, 2);
  fs.writeFileSync('_data/notes.json', data);
  console.log('_data/notes.json generated successfully!');
});
