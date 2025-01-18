// Fetch news from StockTitan API
async function fetchNews() {
    const apiUrl = "https://stocktitan.net:11101/api/news/json?token=nNngJ0LgmazMiHUrBS77s2R19bG7P4T7AT1fUsTx4o1AZm576U1HHAMoV4IC";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const newsFeed = document.getElementById("news-feed");
        newsFeed.innerHTML = ""; // Clear previous news

        data.forEach(news => {
            // Create a news element
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // Define positive & negative text
            let positiveContent = news.news.positive || "No positive content available.";
            let negativeContent = news.news.negative || "No negative content available.";

            // Add news content
            newsItem.innerHTML = `
                <h3>${news.news.title}</h3>
                <p>${news.news.summary}</p>
                <p>${formatDate(news.news.date)}</p>
                <div class="positive"><strong>Positive Insights:</strong><br> ${positiveContent}</div>
                <div class="negative"><strong>Negative Insights:</strong><br> ${negativeContent}</div>
            `;

            // Append news item to news feed
            newsFeed.appendChild(newsItem);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Date Formatting
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Fetch news on page load
fetchNews();
