// Haberleri StockTitan API'den çek
async function fetchNews() {
    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API isteği başarısız oldu");

        const data = await response.json();
        console.log("StockTitan API Verisi:", data); // API’den gelen veriyi konsola yazdırıyoruz.

        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önceki haberleri temizle

        for (const news of data) {
            console.log("Tekil Haber Verisi:", news); // Her bir haber verisini ayrı ayrı yazdır

            // **Haber detaylarını StockTitan’dan alırken en doğru key’i buluyoruz**
            let newsDetails = news.news.details || news.news.full_text || news.news.body || "Haberin detayları API’den alınamadı.";

            // **Pozitif & Negatif İçerikleri API’den doğru çektiğimizi doğruluyoruz**
            const positiveContent = news.news.positive?.length > 0 ? news.news.positive : ["Olumlu içerik API’den alınamadı."];
            const negativeContent = news.news.negative?.length > 0 ? news.news.negative : ["Negatif içerik API’den alınamadı."];

            console.log("Haber Detayları:", newsDetails);
            console.log("Pozitif İçerikler:", positiveContent);
            console.log("Negatif İçerikler:", negativeContent);

            // Yeni haber elemanı oluştur
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // Haber içeriğini ekle
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${newsDetails}</p>
                <p>${formatDate(news.news.date)}</p>

                <div class="evaluation-container">
                    <h4 class="evaluation-header positive-header">Olumlu</h4>
                    <div class="evaluation-box positive-box">
                        <ul>${positiveContent.map(item => `<li>${item}</li>`).join("")}</ul>
                    </div>

                    <h4 class="evaluation-header negative-header">Negatif</h4>
                    <div class="evaluation-box negative-box">
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
