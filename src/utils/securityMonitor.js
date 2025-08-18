// Güvenlik Monitoring Sistemi
export class SecurityMonitor {
  constructor() {
    this.securityEvents = [];
    this.maxEvents = 1000;
    this.suspiciousPatterns = new Set();
    this.blockedIPs = new Set();
    this.initializeMonitoring();
  }

  // Monitoring sistemini başlat
  initializeMonitoring() {
    // Console override - güvenlik olaylarını yakala
    this.overrideConsole();
    
    // Network monitoring
    this.monitorNetworkRequests();
    
    // DOM monitoring
    this.monitorDOMChanges();
    
    // Storage monitoring
    this.monitorStorageAccess();
    
    // Error monitoring
    this.monitorErrors();
  }

  // Console override
  overrideConsole() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    console.log = (...args) => {
      this.checkForSuspiciousContent(args.join(' '), 'console_log');
      originalLog.apply(console, args);
    };
    
    console.warn = (...args) => {
      this.checkForSuspiciousContent(args.join(' '), 'console_warn');
      originalWarn.apply(console, args);
    };
    
    console.error = (...args) => {
      this.checkForSuspiciousContent(args.join(' '), 'console_error');
      originalError.apply(console, args);
    };
  }

  // Network request monitoring
  monitorNetworkRequests() {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const [url, options] = args;
      
      // Güvenlik kontrolü
      this.checkNetworkRequest(url, options);
      
      try {
        const response = await originalFetch(...args);
        this.logSecurityEvent('network_request', {
          url: typeof url === 'string' ? url : url.toString(),
          method: options?.method || 'GET',
          status: response.status,
          success: response.ok
        });
        return response;
      } catch (error) {
        this.logSecurityEvent('network_error', {
          url: typeof url === 'string' ? url : url.toString(),
          error: error.message
        });
        throw error;
      }
    };
  }

  // DOM değişikliklerini izle
  monitorDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.checkDOMElement(node);
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Storage erişimini izle
  monitorStorageAccess() {
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;
    
    localStorage.setItem = (key, value) => {
      this.checkStorageAccess(key, value, 'set');
      return originalSetItem.call(localStorage, key, value);
    };
    
    localStorage.getItem = (key) => {
      this.checkStorageAccess(key, null, 'get');
      return originalGetItem.call(localStorage, key);
    };
  }

  // Error monitoring
  monitorErrors() {
    window.addEventListener('error', (event) => {
      this.logSecurityEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.stack
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.logSecurityEvent('unhandled_promise_rejection', {
        reason: event.reason
      });
    });
  }

  // Network request güvenlik kontrolü
  checkNetworkRequest(url, options) {
    const urlString = typeof url === 'string' ? url : url.toString();
    
    // HTTP kontrolü
    if (urlString.startsWith('http://')) {
      this.logSecurityEvent('insecure_request', { url: urlString });
    }
    
    // Şüpheli domain kontrolü
    if (this.isSuspiciousDomain(urlString)) {
      this.logSecurityEvent('suspicious_domain', { url: urlString });
    }
    
    // Headers kontrolü
    if (options?.headers) {
      this.checkHeaders(options.headers);
    }
  }

  // DOM element güvenlik kontrolü
  checkDOMElement(element) {
    // Script tag kontrolü
    if (element.tagName === 'SCRIPT') {
      this.logSecurityEvent('dynamic_script', {
        src: element.src,
        content: element.textContent?.substring(0, 100)
      });
    }
    
    // Inline event handler kontrolü
    const inlineEvents = ['onclick', 'onload', 'onerror', 'onmouseover'];
    inlineEvents.forEach(event => {
      if (element.hasAttribute(event)) {
        this.logSecurityEvent('inline_event_handler', {
          event,
          element: element.tagName,
          value: element.getAttribute(event)?.substring(0, 100)
        });
      }
    });
  }

  // Storage erişim kontrolü
  checkStorageAccess(key, value, operation) {
    const sensitiveKeys = ['api_key', 'token', 'password', 'secret'];
    
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      this.logSecurityEvent('sensitive_storage_access', {
        key,
        operation,
        hasValue: !!value
      });
    }
  }

  // Şüpheli içerik kontrolü
  checkForSuspiciousContent(content, source) {
    const suspiciousPatterns = [
      /api[_-]?key/i,
      /password/i,
      /token/i,
      /secret/i,
      /http:\/\//i,
      /<script/i,
      /javascript:/i
    ];
    
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        this.logSecurityEvent('suspicious_content', {
          pattern: pattern.source,
          source,
          content: content.substring(0, 100)
        });
      }
    });
  }

  // Şüpheli domain kontrolü
  isSuspiciousDomain(url) {
    const suspiciousDomains = [
      'malicious.com',
      'phishing.com',
      'scam.com'
    ];
    
    return suspiciousDomains.some(domain => url.includes(domain));
  }

  // Headers kontrolü
  checkHeaders(headers) {
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
    
    Object.keys(headers).forEach(header => {
      if (sensitiveHeaders.includes(header.toLowerCase())) {
        this.logSecurityEvent('sensitive_header', {
          header: header.toLowerCase(),
          hasValue: !!headers[header]
        });
      }
    });
  }

  // Güvenlik olayı logla
  logSecurityEvent(type, data) {
    const event = {
      type,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId(),
      data
    };
    
    this.securityEvents.push(event);
    
    // Maksimum event sayısını kontrol et
    if (this.securityEvents.length > this.maxEvents) {
      this.securityEvents = this.securityEvents.slice(-this.maxEvents);
    }
    
    // Kritik olayları console'a yazdır
    if (this.isCriticalEvent(type)) {
      console.warn('🚨 Güvenlik Olayı:', type, data);
    }
    
    // Local storage'a kaydet
    this.saveToStorage();
  }

  // Kritik olay kontrolü
  isCriticalEvent(type) {
    const criticalEvents = [
      'insecure_request',
      'suspicious_domain',
      'dynamic_script',
      'inline_event_handler',
      'sensitive_storage_access'
    ];
    
    return criticalEvents.includes(type);
  }

  // Session ID al
  getSessionId() {
    if (!this.sessionId) {
      this.sessionId = btoa(Date.now() + Math.random()).substring(0, 16);
    }
    return this.sessionId;
  }

  // Storage'a kaydet
  saveToStorage() {
    try {
      localStorage.setItem('security_events', JSON.stringify(this.securityEvents));
    } catch (error) {
      // Storage dolu olabilir, eski olayları temizle
      this.securityEvents = this.securityEvents.slice(-500);
      localStorage.setItem('security_events', JSON.stringify(this.securityEvents));
    }
  }

  // Güvenlik raporu al
  getSecurityReport() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    const recentEvents = this.securityEvents.filter(
      event => now - event.timestamp < oneHour
    );
    
    const eventCounts = {};
    recentEvents.forEach(event => {
      eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
    });
    
    return {
      totalEvents: this.securityEvents.length,
      recentEvents: recentEvents.length,
      eventCounts,
      criticalEvents: recentEvents.filter(event => this.isCriticalEvent(event.type)),
      timestamp: now
    };
  }

  // Güvenlik durumu kontrolü
  checkSecurityStatus() {
    const report = this.getSecurityReport();
    const criticalCount = report.criticalEvents.length;
    
    if (criticalCount > 5) {
      return { status: 'HIGH_RISK', message: 'Yüksek güvenlik riski tespit edildi' };
    } else if (criticalCount > 2) {
      return { status: 'MEDIUM_RISK', message: 'Orta güvenlik riski tespit edildi' };
    } else {
      return { status: 'LOW_RISK', message: 'Düşük güvenlik riski' };
    }
  }

  // Monitoring'i durdur
  stopMonitoring() {
    // Console override'ı geri al
    console.log = console.log;
    console.warn = console.warn;
    console.error = console.error;
  }
}

export const securityMonitor = new SecurityMonitor();
