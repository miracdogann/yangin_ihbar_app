// API Proxy sistemi - Basitleştirilmiş güvenlik katmanları
export class ApiProxy {
  constructor() {
    this.requestQueue = [];
    this.isProcessing = false;
    this.maxRetries = 3;
    this.baseDelay = 1000;
    this.sessionId = this.generateSessionId();
    this.requestCounter = 0;
  }

  // Session ID oluştur (her sayfa yenilemesinde değişir)
  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${timestamp}-${random}-${navigator.userAgent}`).substring(0, 32);
  }

  // İstek sırası oluştur (DDoS koruması)
  async queueRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ endpoint, options, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const { endpoint, options, resolve, reject } = this.requestQueue.shift();
      
      try {
        // Exponential backoff ile güvenli istek
        await this.delay(this.baseDelay);
        const response = await this.secureRequest(endpoint, options);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }
    
    this.isProcessing = false;
  }

  async secureRequest(endpoint, options) {
    let retries = 0;
    
    while (retries < this.maxRetries) {
      try {
        // Gelişmiş güvenlik kontrolleri
        this.checkRateLimit();
        
        // Güvenlik headers'ı ekle (CORS uyumlu)
        const secureOptions = {
          ...options,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'YanginApp/1.0',
            'X-Requested-With': 'XMLHttpRequest',
            ...options.headers
          },
          signal: AbortSignal.timeout(15000) // 15 saniye timeout
        };

        const response = await fetch(endpoint, secureOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        return response;
      } catch (error) {
        retries++;
        
        if (retries >= this.maxRetries) throw error;
        
        // Exponential backoff
        await this.delay(this.baseDelay * Math.pow(2, retries));
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Gelişmiş rate limiting kontrolü
  checkRateLimit() {
    const requests = JSON.parse(localStorage.getItem('recent_requests') || '[]');
    const now = Date.now();
    const fiveMinutesAgo = now - (5 * 60 * 1000);
    
    // 5 dakika içindeki istekleri filtrele
    const recentRequests = requests.filter(time => time > fiveMinutesAgo);
    
    // Session bazlı rate limiting
    const sessionRequests = recentRequests.filter(req => 
      req.sessionId === this.sessionId
    );
    
    if (sessionRequests.length >= 15) { // 5 dakikada maksimum 15 istek
      throw new Error('Rate limit aşıldı - lütfen bekleyin');
    }
    
    // Global rate limiting
    if (recentRequests.length >= 50) { // 5 dakikada maksimum 50 istek (tüm kullanıcılar)
      throw new Error('Sistem yoğun - lütfen bekleyin');
    }
    
    // Yeni isteği kaydet
    const newRequest = {
      timestamp: now,
      sessionId: this.sessionId,
      requestId: this.generateRequestId()
    };
    
    recentRequests.push(newRequest);
    localStorage.setItem('recent_requests', JSON.stringify(recentRequests));
  }

  // Request ID oluştur
  generateRequestId() {
    this.requestCounter++;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${timestamp}-${this.requestCounter}-${random}`).substring(0, 16);
  }
}

export const apiProxy = new ApiProxy();
