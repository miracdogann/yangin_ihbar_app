// API URL Obfuscation - Reverse engineering zorlaştırma
export class ApiObfuscation {
  constructor() {
    this.obfuscationKey = this.generateObfuscationKey();
    this.endpointMap = new Map();
  }

  // Obfuscation key oluştur
  generateObfuscationKey() {
    const timestamp = Date.now();
    const userAgent = navigator.userAgent;
    const screenInfo = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const keyData = `${timestamp}-${userAgent}-${screenInfo}-${timezone}`;
    return btoa(keyData).substring(0, 32);
  }

  // URL'yi obfuscate et
  obfuscateUrl(url) {
    if (!url) return null;
    
    // URL'yi parçalara böl
    const urlObj = new URL(url);
    const protocol = urlObj.protocol;
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;
    const search = urlObj.search;
    
    // Her parçayı ayrı ayrı obfuscate et
    const obfuscatedHostname = this.obfuscateString(hostname);
    const obfuscatedPathname = this.obfuscateString(pathname);
    const obfuscatedSearch = this.obfuscateString(search);
    
    // Obfuscated URL oluştur
    const obfuscatedUrl = `${protocol}//${obfuscatedHostname}${obfuscatedPathname}${obfuscatedSearch}`;
    
    // Mapping'i sakla
    this.endpointMap.set(obfuscatedUrl, url);
    
    return obfuscatedUrl;
  }

  // String obfuscation
  obfuscateString(str) {
    if (!str) return '';
    
    // Base64 encoding
    let encoded = btoa(str);
    
    // Character shifting
    encoded = encoded.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      } else if (code >= 48 && code <= 57) { // 0-9
        return String.fromCharCode(((code - 48 + 5) % 10) + 48);
      }
      return char;
    }).join('');
    
    // Reverse string
    encoded = encoded.split('').reverse().join('');
    
    return encoded;
  }

  // Obfuscated URL'yi deobfuscate et
  deobfuscateUrl(obfuscatedUrl) {
    if (!obfuscatedUrl) return null;
    
    // Mapping'den kontrol et
    if (this.endpointMap.has(obfuscatedUrl)) {
      return this.endpointMap.get(obfuscatedUrl);
    }
    
    // URL'yi parçalara böl
    const urlObj = new URL(obfuscatedUrl);
    const protocol = urlObj.protocol;
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;
    const search = urlObj.search;
    
    // Her parçayı deobfuscate et
    const deobfuscatedHostname = this.deobfuscateString(hostname);
    const deobfuscatedPathname = this.deobfuscateString(pathname);
    const deobfuscatedSearch = this.deobfuscateString(search);
    
    return `${protocol}//${deobfuscatedHostname}${deobfuscatedPathname}${deobfuscatedSearch}`;
  }

  // String deobfuscation
  deobfuscateString(str) {
    if (!str) return '';
    
    // Reverse string back
    let decoded = str.split('').reverse().join('');
    
    // Character shifting back
    decoded = decoded.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCharCode(((code - 65 - 13 + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCharCode(((code - 97 - 13 + 26) % 26) + 97);
      } else if (code >= 48 && code <= 57) { // 0-9
        return String.fromCharCode(((code - 48 - 5 + 10) % 10) + 48);
      }
      return char;
    }).join('');
    
    // Base64 decoding
    try {
      return atob(decoded);
    } catch (error) {
      return decoded;
    }
  }

  // Environment variable'dan güvenli endpoint al
  getSecureEndpoint(baseKey, fallbackKey = null) {
    const endpoint = import.meta.env[baseKey] || 
                    (fallbackKey ? import.meta.env[fallbackKey] : null);
    
    if (!endpoint) {
      throw new Error('API endpoint not configured');
    }
    
    // HTTPS kontrolü
    if (!endpoint.startsWith('https://')) {
      throw new Error('Insecure API endpoint');
    }
    
    // Obfuscate et
    return this.obfuscateUrl(endpoint);
  }

  // Obfuscated endpoint'i kullanarak API çağrısı yap
  async makeSecureRequest(obfuscatedEndpoint, options = {}) {
    const realEndpoint = this.deobfuscateUrl(obfuscatedEndpoint);
    
    if (!realEndpoint) {
      throw new Error('Invalid obfuscated endpoint');
    }
    
    // Güvenlik headers ekle
    const secureOptions = {
      ...options,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YanginApp/1.0',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Obfuscation-Key': this.obfuscationKey,
        'X-Timestamp': Date.now().toString(),
        ...options.headers
      }
    };
    
    return fetch(realEndpoint, secureOptions);
  }

  // Endpoint mapping'i temizle
  clearMapping() {
    this.endpointMap.clear();
  }

  // Mapping size kontrolü
  getMappingSize() {
    return this.endpointMap.size;
  }
}

export const apiObfuscation = new ApiObfuscation();
