const axios = require("axios");
const cheerio = require("cheerio");
const { loadCookieHeader } = require("../cookies"); // jika pakai multi-cookie

module.exports = async function (req, res) {
  const { url } = req.query;
  if (!url || !url.includes("threads.net")) {
    return res.status(400).json({ status: false, message: "URL Threads tidak valid." });
  }

  try {
    // Ambil cookie secara otomatis jika kamu punya sistem multi-cookie
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
      "Cookie": loadCookieHeader("threads") || "", // opsional
    };

    const { data: html } = await axios.get(url, { headers });
    const $ = cheerio.load(html);
    const jsonRaw = $('script[type="application/ld+json"]').html();
    const json = JSON.parse(jsonRaw);

    const media = json.video ? json.video.contentUrl : null;

    if (!media) {
      return res.status(404).json({ status: false, message: "Media tidak ditemukan." });
    }

    return res.json({
      status: true,
      url: media,
      type: "video",
      desc: json.description || "",
      author: json.author?.name || null,
    });
  } catch (e) {
    console.error("THREADS ERROR:", e.message);
    return res.status(500).json({ status: false, message: "Gagal mengambil konten Threads." });
  }
};
