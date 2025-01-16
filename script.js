// Yüzde değişim hesaplama fonksiyonu
function calculateChange() {
    // Kullanıcıdan fiyatları al
    var oldPrice = parseFloat(document.getElementById('oldPrice').value);
    var newPrice = parseFloat(document.getElementById('newPrice').value);

    // Geçerli olup olmadığını kontrol et
    if (isNaN(oldPrice) || isNaN(newPrice)) {
        document.getElementById('result').innerHTML = "Lütfen geçerli fiyatlar girin.";
        return;
    }

    // Yüzde değişim hesapla
    var change = ((newPrice - oldPrice) / oldPrice) * 100;

    // Sonucu ekranda göster
    document.getElementById('result').innerHTML = "Yüzde Değişim: " + change.toFixed(2) + "%";
}
