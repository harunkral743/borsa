async function fetchNews() {
    try {
        const response = await fetch('http://127.0.0.1:5000/scrape_news'); // Backend'den verileri al
        const data = await response.json();

        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Önceki haberleri temizle

        data.forEach(news => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            newsItem.innerHTML = `
                <h3><a href="${news.link}" target="_blank">${news.title}</a></h3>
                <p><strong>Tarih:</strong> ${news.date}</p>
                <p><strong>Şirket:</strong> ${news.company}</p>
            `;

            newsFeed.appendChild(newsItem);
        });
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
    }
}

// Sayfa yüklendiğinde haberleri çek
fetchNews();
