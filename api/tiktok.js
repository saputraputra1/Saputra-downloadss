const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const stats = require('../utils/stats');
const path = require('path');

router.post('/', (req, res) => {
  const { url, type } = req.body;
  if (!url) return res.status(400).json({ status: false, message: 'URL kosong!' });
  if (!url.includes('/video/')) return res.status(400).json({ status: false, message: 'Link bukan video TikTok!' });

  const format = type === 'audio' ? 'bestaudio' : 'best';
  const cookiePath = path.join(__dirname, '../cookies/cookies.txt');
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

  const cmd = `yt-dlp -f ${format} --cookies "${cookiePath}" --user-agent "${ua}" -g "${url}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err || !stdout.trim()) {
      return res.status(500).json({ status: false, error: stderr || 'Link tidak ditemukan' });
    }
    stats.recordDownload();
    res.json({ status: true, result: stdout.trim() });
  });
});

module.exports = router;
