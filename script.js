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

            // Pozitif ve negatif içerik varsa ekle
            let positiveContent = news.news.positive || "Pozitif içerik bulunmamaktadır.";
            let negativeContent = news.news.negative || "Negatif içerik bulunmamaktadır.";

            // Haber içeriğini ekle
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${news.news.summary}</p>
                <p class="news-date">${formatDate(news.news.date)}</p>

                <div class="analysis-box">
                    <h4>Pozitif Sonuçlar</h4>
                    <p class="positive">${positiveContent}</p>
                </div>

                <div class="analysis-box">
                    <h4>Negatif Sonuçlar</h4>
                    <p class="negative">${negativeContent}</p>
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
