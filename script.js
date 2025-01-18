async function fetchStockPrice(symbol) {
    const yahooFinanceAPI = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=1m&range=1d`;
    const alphaVantageAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=DEMO_KEY`;
    const polygonAPI = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=DEMO_KEY`;

    const fetchFromAPI = async (url, source) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && Object.keys(data).length > 0) {
                return { data, source };
            }
            throw new Error("Geçersiz veri");
        } catch (error) {
            console.error(`API Hatası - ${source}:`, error);
            return null;
        }
    };

    // API çağrılarını paralel olarak başlat
    const responses = await Promise.allSettled([
        fetchFromAPI(yahooFinanceAPI, "Yahoo Finance"),
        fetchFromAPI(alphaVantageAPI, "Alpha Vantage"),
        fetchFromAPI(polygonAPI, "Polygon.io")
    ]);

    // En hızlı dönen ve geçerli veriye sahip olanı seç
    for (const result of responses) {
        if (result.status === "fulfilled" && result.value !== null) {
            console.log(`Hisse Fiyatı ${result.value.source} API'den alındı.`);
            return parseStockPrice(result.value);
        }
    }

    console.error("Hisse fiyatı için geçerli bir veri bulunamadı.");
    return null;
}

// API'den gelen veriyi işleyerek hisse fiyatını çıkarma fonksiyonu
function parseStockPrice(response) {
    if (response.source === "Yahoo Finance") {
        return response.data.chart.result[0].meta.regularMarketPrice;
    } else if (response.source === "Alpha Vantage") {
        return parseFloat(response.data["Global Quote"]["05. price"]);
    } else if (response.source === "Polygon.io") {
        return response.data.results[0].c;
    }
    return null;
}

// Örnek kullanım
fetchStockPrice("AAPL").then(price => {
    if (price !== null) {
        console.log(`Apple'ın Güncel Hisse Fiyatı: $${price}`);
    }
});
