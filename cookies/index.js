const fs = require('fs');
const path = require('path');

const COOKIES_FILE = path.join(__dirname, 'cookies.txt');

function getCookies() {
  try {
    const lines = fs.readFileSync(COOKIES_FILE, 'utf-8')
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'));

    const cookies = lines.map(line => {
      const parts = line.split('\t');
      if (parts.length >= 7) {
        return `${parts[5]}=${parts[6]}`;
      } else {
        return ''; // skip baris invalid
      }
    }).filter(Boolean); // hapus yang kosong

    return cookies.join('; ');
  } catch (err) {
    console.error('[COOKIES] Gagal parsing cookies.txt:', err);
    return '';
  }
}

module.exports = {
  getCookies
};
