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

            // Haber içeriğini ekle
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${news.news.summary}</p>
                <p>${formatDate(news.news.date)}</p>
                <a href="${news.news.url}" target="_blank">Haberi Oku</a>
            `;

            // Haber elemanını haber akışına ekle
            newsFeed.appendChild(newsItem);
        });
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
    }
}

// Sayfa yüklendiğinde haberleri çek
fetchNews();
