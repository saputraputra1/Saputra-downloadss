const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes API aktif
app.use('/api/facebook', require('./api/facebook'));
app.use('/api/instagram', require('./api/instagram'));
app.use('/api/tiktok', require('./api/tiktok'));
app.use('/api/youtube', require('./api/youtube'));
app.use('/api/threads', require('./api/threads')); // Aktif jika threads.js ada

// app.use('/api/twitter', require('./api/twitter')); // ❌ Dihapus karena file tidak ada

// Public folder
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
