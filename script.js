// Haberleri StockTitan API'den çek
async function fetchNews() {
    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önceki haberleri temizle

        for (const news of data) {
            // Haber detaylarını ayrı çekmek için ilgili haberin URL'sine git
            const detailsResponse = await fetch(news.news.url);
            const detailsText = await detailsResponse.text();

            // HTML içinden RHEA-AI ÖZETİ kısmını al
            const parser = new DOMParser();
            const doc = parser.parseFromString(detailsText, "text/html");
            const detailedContent = doc.querySelector(".rhea-ai-summary")?.innerText.trim() || "Detaylı içerik bulunamadı.";

            // Yeni haber elemanı oluştur
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // Haber içeriğini ekle (birebir RHEA-AI ÖZETİ'nden alındı)
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${detailedContent}</p>
                <p>${formatDate(news.news.date)}</p>
                <div class="positive">Positive: ${news.news.positive || "No positive content available."}</div>
                <div class="negative">Negative: ${news.news.negative || "No negative content available."}</div>
            `;

            // Haber elemanını haber akışına ekle
            newsFeed.appendChild(newsItem);
        }
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
    }
}

// Tarih formatını gün/ay/yıl olarak dönüştür
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Aylar 0'dan başlar, +1 ekledik.
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Sayfa yüklendiğinde haberleri çek
fetchNews();
