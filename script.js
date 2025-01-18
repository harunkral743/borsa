const IEX_CLOUD_API_KEY = "YOUR_IEX_CLOUD_API_KEY";  // Buraya kendi API anahtarını ekle
const API_BASE_URL = "https://cloud.iexapis.com/stable/stock";

/**
 * Hisse fiyatını IEX Cloud API'den al
 * @param {string} symbol - Şirketin hisse sembolü (örneğin: AAPL, TSLA, MSFT)
 */
async function fetchStockPrice(symbol) {
    const url = `${API_BASE_URL}/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("API Hatası: " + response.status);
        }

        const data = await response.json();
        return data.latestPrice;  // Güncel hisse fiyatını döndür
    } catch (error) {
        console.error("Hisse Fiyatı Çekilemedi:", error);
        return null;
    }
}

/**
 * StockTitan API'den haberleri çek
 */
async function fetchNews() {
    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önceki haberleri temizle

        data.forEach(async news => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // Şirket sembolünü haberden ayıklama
            const companySymbol = news.news.symbol;
            let stockPrice = null;

            if (companySymbol) {
                stockPrice = await fetchStockPrice(companySymbol); // Güncel fiyatı al
            }

            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${news.news.summary}</p>
                <p><strong>Tarih:</strong> ${formatDate(news.news.date)}</p>
                <p><strong>Hisse Fiyatı:</strong> ${stockPrice ? `$${stockPrice}` : "Bilgi Yok"}</p>
                <div class="positive-negative-container">
                    <div class="positive">${news.news.positive || "Olumlu içerik bulunmamaktadır."}</div>
                    <div class="negative">${news.news.negative || "Negatif içerik bulunmamaktadır."}</div>
                </div>
            `;

            newsFeed.appendChild(newsItem);
        });
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
    }
}

// Tarihi formatlama fonksiyonu
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Sayfa yüklendiğinde haberleri çek
fetchNews();
