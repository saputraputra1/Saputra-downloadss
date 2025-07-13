const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/stats.json');

function loadStats() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ visits: 0, downloads: 0, last_access: null }, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath));
}

function saveStats(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function recordVisit() {
  const stats = loadStats();
  stats.visits += 1;
  stats.last_access = new Date().toISOString();
  saveStats(stats);
}

function recordDownload() {
  const stats = loadStats();
  stats.downloads += 1;
  stats.last_access = new Date().toISOString();
  saveStats(stats);
}

function getStats() {
  return loadStats();
}

module.exports = {
  recordVisit,
  recordDownload,
  getStats
};
