document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("url").value;
  const platform = document.getElementById("platform").value;
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  loading.classList.remove("hidden");
  result.innerHTML = "";

  try {
    const res = await fetch(`/${platform}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    loading.classList.add("hidden");

    if (data.status) {
      result.innerHTML = `<a href="${data.result}" target="_blank" download class="download-link">🔗 Klik untuk Download</a>`;
    } else {
      result.innerHTML = `<p style="color: red;">❌ ${data.error || "Gagal mengambil link."}</p>`;
    }
  } catch (err) {
    loading.classList.add("hidden");
    result.innerHTML = `<p style="color: red;">⚠️ Terjadi error koneksi</p>`;
  }
});

async function loadStats() {
  const res = await fetch("/stats");
  const data = await res.json();
  document.getElementById("stats").innerHTML = `
    <p>👀 Pengunjung: ${data.visits} | 📥 Download: ${data.downloads}</p>
    <p>🕒 Terakhir akses: ${new Date(data.last_access).toLocaleString()}</p>
  `;
}
loadStats();

