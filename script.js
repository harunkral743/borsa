document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript dosyası başarıyla yüklendi.");

    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";
    const newsFeed = document.getElementById("news-feed");

    // Tarihi Gün/Ay/Yıl formatına çevirme fonksiyonu
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    // API'den haberleri çekme fonksiyonu
    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            const newsData = await response.json();

            newsFeed.innerHTML = ""; // Önceki haberleri temizle

            newsData.forEach(news => {
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");

                // Haber içeriğini ekle
                newsItem.innerHTML = `
                    <h3>${news.news.title}</h3>
                    <p><strong>Tarih:</strong> ${formatDate(news.news.date)}</p>
                    <p><strong>Şirket:</strong> ${news.news.symbol} (${news.news.exchange})</p>
                    <p><strong>Kategori:</strong> ${news.news.tag}</p>
                    <p><strong>Özet:</strong> ${news.news.summary}</p>
                    <a href="${news.news.url}" target="_blank">Haberi Oku</a>
                `;

                newsFeed.appendChild(newsItem);
            });

            console.log("Haberler başarıyla yüklendi.");
        } catch (error) {
            console.error("Haberler yüklenirken hata oluştu:", error);
            newsFeed.innerHTML = "<p>Haberler yüklenirken bir hata oluştu.</p>";
        }
    }

    // İlk haberleri yükle
    fetchNews();

    // Her 15 saniyede bir güncelle
    setInterval(fetchNews, 15000);
});
