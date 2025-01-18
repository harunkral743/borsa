// Haberleri StockTitan API'den çek (CORS hatasını önlemek için direkt API'den al)
async function fetchNews() {
    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API isteği başarısız oldu");

        const data = await response.json();
        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önceki haberleri temizle

        for (const news of data) {
            // **Haber detaylarını API'den çekiyoruz, CORS hatasını engelliyoruz**
            const newsDetails = news.news.summary || "Haberin detayları mevcut değil.";
            
            // **Pozitif & Negatif Bölmeler**
            const positiveContent = news.news.positive ? news.news.positive : ["Olumlu içerik bulunmamaktadır."];
            const negativeContent = news.news.negative ? news.news.negative : ["Negatif içerik bulunmamaktadır."];

            // Yeni haber elemanı oluştur
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // Haber içeriğini ekle
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${newsDetails}</p>
                <p>${formatDate(news.news.date)}</p>

                <div class="evaluation-container">
                    <div class="evaluation-box positive-box">
                        <h4>Olumlu</h4>
                        <ul>${positiveContent.map(item => `<li>${item}</li>`).join("")}</ul>
                    </div>

                    <div class="evaluation-box negative-box">
                        <h4>Negatif</h4>
                        <ul>${negativeContent.map(item => `<li>${item}</li>`).join("")}</ul>
                    </div>
                </div>
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
