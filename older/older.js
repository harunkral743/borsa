// Yüzde değişim hesaplama fonksiyonu
function calculateChange() {
    // Kullanıcıdan fiyatları al
    var oldPrice = parseFloat(document.getElementById('oldPrice').value);
    var newPrice = parseFloat(document.getElementById('newPrice').value);

    // Geçerli olup olmadığını kontrol et
    if (isNaN(oldPrice) || isNaN(newPrice)) {
        // Hata mesajı
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = "Lütfen geçerli fiyatlar girin.";
        resultElement.style.color = "red";  // Hata mesajı için kırmızı renk
        return;
    }

    // Yüzde değişim hesapla
    var change = ((newPrice - oldPrice) / oldPrice) * 100;

    // Sonucu ekranda göster
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = "Yüzde Değişim: " + change.toFixed(2) + "%";
    resultElement.style.color = "green";  // Başarılı hesaplama için yeşil renk
}
