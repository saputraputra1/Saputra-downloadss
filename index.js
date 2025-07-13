const express = require('express');
const cors = require('cors');
const path = require('path');
const stats = require('./utils/stats');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Catat kunjungan ke halaman utama
app.get('/', (req, res) => {
  stats.recordVisit();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint statistik
app.get('/stats', (req, res) => {
  res.json(stats.getStats());
});

// API routes
app.use('/youtube', require('./api/youtube'));
app.use('/instagram', require('./api/instagram'));
app.use('/tiktok', require('./api/tiktok'));
app.use('/facebook', require('./api/facebook'));
app.use('/threads', require('./api/threads'));
app.use('/twitter', require('./api/twitter'));

app.listen(PORT, () => {
  console.log(`✅ Server aktif di http://localhost:${PORT}`);
});
