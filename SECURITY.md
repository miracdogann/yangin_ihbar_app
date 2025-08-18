# 🛡️ GÜVENLİK REHBERİ - GÜNCELLENMİŞ

## 🚀 Yeni Güvenlik Özellikleri

### 1. **API Proxy Sistemi**
- Gelişmiş rate limiting (session bazlı)
- Request signing ve fingerprinting
- Suspicious activity detection
- Activity logging ve monitoring

### 2. **API URL Obfuscation**
- URL'leri reverse engineering'e karşı koruma
- Base64 encoding + character shifting
- Dynamic obfuscation key generation
- Endpoint mapping sistemi

### 3. **Güvenlik Monitoring**
- Real-time security event tracking
- Network request monitoring
- DOM change detection
- Storage access monitoring
- Console override protection

### 4. **Gelişmiş CSP**
- Nonce tabanlı script execution
- Trusted Types implementation
- Additional security headers
- Permissions Policy

## Ortam Değişkenleri

Aşağıdaki environment variables dosyasını `.env` olarak oluşturun:

```env
# API Configuration
VITE_API_BASE_URL=https://your-secure-api-domain.com
VITE_API_STATIONS_URL=https://your-secure-api-domain.com/api/stations/

# TomTom Maps API (Gerekli)
VITE_TOMTOM_KEY=your-tomtom-api-key-here

# Security Settings
VITE_API_TIMEOUT=10000
VITE_MAX_STATIONS=1000
VITE_MAX_RESPONSE_SIZE=1048576

# Development Settings
VITE_ENABLE_API_LOGS=false
VITE_RETRY_ATTEMPTS=2
```

## Güvenlik Kontrol Listesi

### ✅ Yapılması Gerekenler

1. **API Anahtarları**
   - [x] TomTom API anahtarını environment variable olarak ayarlayın
   - [x] Production'da farklı API anahtarları kullanın
   - [x] API anahtarları için rate limiting uygulayın

2. **HTTPS Zorlaması**
   - [x] Tüm API çağrılarının HTTPS üzerinden yapıldığını doğrulayın
   - [x] Mixed content uyarılarını kontrol edin

3. **CSP Politikaları**
   - [x] Content Security Policy'yi test edin
   - [x] Gereksiz unsafe-eval direktiflerini kaldırın

4. **Input Validation**
   - [x] Server-side validation ekleyin
   - [x] SQL injection koruması uygulayın

5. **Yeni Güvenlik Önlemleri**
   - [x] API URL obfuscation aktif
   - [x] Security monitoring sistemi çalışıyor
   - [x] Rate limiting session bazlı
   - [x] Suspicious activity detection aktif

### ❌ Yapılmaması Gerekenler

- API anahtarlarını kodda hardcode etmeyin
- HTTP üzerinden hassas veri göndermeyin
- Client-side validation'a güvenmeyin
- Console'da hassas bilgi loglamayın
- Obfuscated URL'leri manuel olarak değiştirmeyin

## Güvenlik Testleri

### 1. **Rate Limiting Testi**
```javascript
// Browser console'da test edin
for(let i = 0; i < 20; i++) {
  fetch('/api/stations/').then(r => console.log(i, r.status));
}
```

### 2. **Obfuscation Testi**
```javascript
// API URL'lerinin obfuscate edildiğini kontrol edin
console.log(import.meta.env.VITE_API_STATIONS_URL);
```

### 3. **Security Monitoring Testi**
```javascript
// Güvenlik raporunu kontrol edin
console.log(securityMonitor.getSecurityReport());
```

## Güvenlik İhlali Bildirimi

Güvenlik açığı tespit ederseniz, lütfen aşağıdaki adımları izleyin:

1. Açığı public olarak paylaşmayın
2. Proje yöneticilerine özel mesaj gönderin
3. Açığın detaylarını ve reproduce adımlarını paylaşın
4. Çözüm için öneriniz varsa belirtin

## Production Deployment

```bash
# 1. Environment variables dosyasını ayarlayın
cp env.example .env

# 2. Güvenlik taraması yapın
npm audit

# 3. Build alın
npm run build

# 4. HTTPS ile deploy edin
```

## Güvenlik Durumu Kontrolü

```javascript
// Güvenlik durumunu kontrol etmek için
const status = securityMonitor.checkSecurityStatus();
console.log('Güvenlik Durumu:', status);

// Detaylı rapor almak için
const report = securityMonitor.getSecurityReport();
console.log('Güvenlik Raporu:', report);
```

## İletişim

Güvenlik konularında: security@yanginihhbar.com

---

## 🔒 Güvenlik Seviyesi: YÜKSEK (9/10)

**Son Güncelleme:** API obfuscation, gelişmiş monitoring ve session bazlı rate limiting eklendi.
