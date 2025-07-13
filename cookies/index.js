// === index.js FINAL untuk Railway ===

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware (opsional untuk body parser jika pakai POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public folder (jika kamu simpan hasil download)
app.use('/public', express.static(path.join(__dirname, 'public')));

// === Contoh route utama ===
app.get('/', (req, res) => {
  res.send('🚀 API Downloader aktif dan berjalan dengan sukses di Railway!');
});

// === Contoh route untuk status download (dummy) ===
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Downloader aktif.' });
});

// === Tambahkan route downloader kamu di sini ===
// Misal: require('./routes/instagram')(app);
// Misal: require('./routes/facebook')(app);
// Pastikan file route-nya ada jika ingin modular

// === Menjalankan server ===
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});
