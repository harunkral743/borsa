// 📌 Stock Titan API URL ve Token
const apiToken = "nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";
const apiUrl = `https://stocktitan.net:11101/api/news/json?token=${apiToken}`;

// 📌 Filtreleme Kriterleri (Senin istediğin kriterlere göre)
const allowedCompanies = ["NVIDIA", "TESLA", "SPACEX", "AMAZON", "GOOGL", "META", "APPLE", "AMD"];
const importantKeywords = ["acquisition", "merger", "buys", "purchase", "breakthrough", "robotic", "AI", "quantum"];
const excludedTags = ["OTC"];

// 📌 API'den Haber Çekme Fonksiyonu
async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 📌 Haberleri Filtreleme ve Ekrana Ekleme
        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önce temizleyelim

        data.forEach(news => {
            // Haber başlığı ve özetini al
            const title = news.news.title || "";
            const summary = news.news.summary || "";
            const tag = news.news.tag || "";
            const symbol = news.news.symbol || "";
            const date = new Date(news.news.date);

            // Tarihi Gün/Ay/Yıl formatına çevir
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

            // 📌 İstenmeyen tag'leri filtrele (Örneğin OTC haberleri)
            if (excludedTags.includes(tag)) return;

            // 📌 Önemli anahtar kelimeleri kontrol et
            let isImportant = importantKeywords.some(keyword => title.toLowerCase().includes(keyword) || summary.toLowerCase().includes(keyword));

            // 📌 Şirket adı kontrolü
            let isRelevantCompany = allowedCompanies.some(company => title.includes(company) || summary.includes(company));

            // 📌 Eğer haber önemliyse veya belirttiğin şirketler geçiyorsa göster
            if (isImportant || isRelevantCompany) {
                // 📌 Haber Kartı Oluştur
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");

                // 📌 ÖNEMLİ etiketi ekleyelim
                const importantTag = isImportant ? `<span class="important">ÖNEMLİ!</span> ` : "";

                newsItem.innerHTML = `
                    <h3>${importantTag}${title}</h3>
                    <p>${summary}</p>
                    <p class="news-date">${formattedDate}</p>
                    <a href="${news.news.url}" target="_blank">Haberi Oku</a>
                `;

                // 📌 Haber Kartını Ekle
                newsFeed.appendChild(newsItem);
            }
        });
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
    }
}

// 📌 Sayfa Yüklendiğinde Haberleri Çek
window.onload = fetchNews;
