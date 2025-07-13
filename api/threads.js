const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

module.exports = async function (req, res) {
  const { url } = req.query;
  if (!url || !url.includes("threads.net")) {
    return res.status(400).json({ status: false, message: "URL Threads tidak valid." });
  }

  try {
    // Baca cookies.txt
    const cookiePath = path.join(__dirname, "../cookies/cookies.txt");
    const cookieString = fs.existsSync(cookiePath) ? fs.readFileSync(cookiePath, "utf8") : "";

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
      "Cookie": cookieString.trim(),
    };

    const { data: html } = await axios.get(url, { headers });
    const $ = cheerio.load(html);
    const jsonRaw = $('script[type="application/ld+json"]').html();
    const json = JSON.parse(jsonRaw);

    const media = json.video ? json.video.contentUrl : null;

    if (!media) {
      return res.status(404).json({ status: false, message: "Media tidak ditemukan." });
    }

    res.json({
      status: true,
      url: media,
      title: json.name || "Threads Video",
      thumbnail: json.thumbnailUrl || null,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Gagal mengambil data.", error: err.message });
  }
};
