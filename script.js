// Haberleri StockTitan API'den çek
async function fetchNews() {
    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önceki haberleri temizle

        data.forEach(news => {
            // Yeni haber elemanı oluştur
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // Olumlu ve Negatif içerikleri belirle
            const positiveContent = news.news.positive_content || "No positive content available.";
            const negativeContent = news.news.negative_content || "No negative content available.";

            // Haber içeriğini ekle
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${news.news.summary}</p>
                <p>${formatDate(news.news.date)}</p>

                <!-- Olumlu ve Negatif Sonuçları Yan Yana Yerleştir -->
                <div class="positive-negative-container">
                    <div class="positive">
                        <strong>Positive:</strong> ${positiveContent}
                    </div>
                    <div class="negative">
                        <strong>Negative:</strong> ${negativeContent}
                    </div>
                </div>
            `;

            // Haber elemanını haber akışına ekle
            newsFeed.appendChild(newsItem);
        });
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
    }
}

// **Eksik olan formatDate fonksiyonunu ekliyoruz**
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Aylar 0'dan başlar, bu yüzden +1
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Sayfa yüklendiğinde haberleri çek
fetchNews();
