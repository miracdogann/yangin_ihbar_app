# Yangın İhbar Uygulaması

## Kurulum
1. Projeyi zip olarak indirdikten sonra kök dizinde `npm install` çalıştırın
2. `npm run dev` ile geliştirme sunucusunu başlatın
3. Tarayıcıda `localhost:5173` adresine gidin

## Güvenlik Önlemleri
- **CSP (Content Security Policy)**: `index.html` içinde tanımlı, harici kaynakları sınırlandırır
- **Referrer Policy**: Cross-origin veri sızıntısını önler
- **Secure API Calls**: Cross-origin isteklerde güvenlik başlıkları
- **Development Headers**: Vite dev sunucusu ek güvenlik başlıkları sağlar

## Teknolojiler
- React + Vite
- Bootstrap CSS
- TomTom Maps API
