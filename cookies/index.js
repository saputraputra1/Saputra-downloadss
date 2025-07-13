const fs = require('fs');
const path = require('path');

const COOKIES_FILE = path.join(__dirname, 'cookies.txt');

// Fungsi: membaca cookies.txt & parsing jadi header Cookie: ...
function getCookies() {
  try {
    const lines = fs.readFileSync(COOKIES_FILE, 'utf-8')
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'));

    if (!lines.length) return '';

    // Ambil acak satu akun (misalnya 5-10 baris = 1 akun)
    const selectedLines = lines; // kamu bisa ubah ini kalau struktur per akun > 1 baris

    const cookies = selectedLines.map(line => {
      const parts = line.split('\t');
      const name = parts[5];
      const value = parts[6];
      return `${name}=${value}`;
    });

    // Gabungkan menjadi header "Cookie: name=value; name2=value2"
    return cookies.join('; ');
  } catch (err) {
    console.error('[COOKIES] Failed to parse cookies.txt:', err);
    return '';
  }
}

module.exports = {
  getCookies
};
