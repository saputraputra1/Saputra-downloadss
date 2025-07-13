const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');
const stats = require('../utils/stats');

router.post('/', (req, res) => {
  const { url, type } = req.body;
  if (!url) return res.status(400).json({ status: false, message: 'URL kosong!' });

  const format = type === 'audio' ? 'bestaudio' : 'best';
  const cookieFile = path.join(__dirname, '../cookies/cookies.txt');
  const cmd = `yt-dlp -f ${format} --cookies "${cookieFile}" -g "${url}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err || !stdout.trim()) {
      return res.status(500).json({ status: false, error: stderr || 'Link tidak ditemukan' });
    }
    stats.recordDownload();
    res.json({ status: true, result: stdout.trim() });
  });
});

module.exports = router;
