const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function getCookiesList() {
  const dir = path.join(__dirname, '../cookies');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));
  return files.map(file => path.join(dir, file));
}

module.exports = function ytdlp(url, type = 'video') {
  return new Promise((resolve, reject) => {
    const format = type === 'audio' ? 'bestaudio' : 'best';
    const cookiesFiles = getCookiesList();

    const tryNext = (index) => {
      if (index >= cookiesFiles.length) {
        return reject('❌ Semua cookies gagal. Perlu update cookies.txt');
      }

      const cookieFile = cookiesFiles[index];
      const cmd = `yt-dlp -f ${format} --cookies "${cookieFile}" -g "${url}"`;

      exec(cmd, (err, stdout, stderr) => {
        if (err || !stdout.trim()) {
          console.warn(`⚠️ Gagal pakai ${cookieFile}, coba berikutnya...`);
          tryNext(index + 1);
        } else {
          resolve(stdout.trim());
        }
      });
    };

    tryNext(0);
  });
};
