// API güvenlik utilities
export class ApiSecurity {
  // Simple obfuscation (reverse engineering zorlaştır)
  static obfuscateUrl(baseUrl) {
    const parts = baseUrl.split('://');
    const protocol = parts[0];
    const domain = parts[1];
    
    // Domain'i parçalara böl
    const domainParts = domain.split('.');
    const obfuscated = domainParts.map(part => {
      return part.split('').reverse().join('');
    }).join('.');
    
    return protocol + '://' + obfuscated;
  }

  static deobfuscateUrl(obfuscatedUrl) {
    const parts = obfuscatedUrl.split('://');
    const protocol = parts[0];
    const domain = parts[1];
    
    const domainParts = domain.split('.');
    const deobfuscated = domainParts.map(part => {
      return part.split('').reverse().join('');
    }).join('.');
    
    return protocol + '://' + deobfuscated;
  }

  // Request fingerprinting
  static generateRequestId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(timestamp + '-' + random).substring(0, 16);
  }

  // Suspicious activity detection
  static detectSuspiciousActivity() {
    const activities = JSON.parse(localStorage.getItem('activity_log') || '[]');
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    // Son 1 saatteki aktiviteleri kontrol et
    const recentActivities = activities.filter(activity => 
      now - activity.timestamp < oneHour
    );
    
    // Şüpheli pattern'ler
    const rapidRequests = recentActivities.filter(activity => 
      activity.type === 'api_request'
    ).length;
    
    const failedRequests = recentActivities.filter(activity => 
      activity.type === 'api_error'
    ).length;
    
    // Şüpheli aktivite tespiti
    if (rapidRequests > 50 || failedRequests > 10) {
      this.logSuspiciousActivity('high_request_volume');
      throw new Error('Şüpheli aktivite tespit edildi');
    }
  }

  static logActivity(type, data = {}) {
    const activities = JSON.parse(localStorage.getItem('activity_log') || '[]');
    
    activities.push({
      type,
      timestamp: Date.now(),
      data
    });
    
    // Son 100 aktiviteyi tut
    if (activities.length > 100) {
      activities.splice(0, activities.length - 100);
    }
    
    localStorage.setItem('activity_log', JSON.stringify(activities));
  }

  static logSuspiciousActivity(reason) {
    this.logActivity('suspicious_activity', { reason });
    console.warn('🚨 Şüpheli aktivite:', reason);
  }

  // Browser fingerprinting (basit)
  static getBrowserFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser fingerprint', 2, 2);
    
    return {
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      canvas: canvas.toDataURL().substring(0, 50)
    };
  }
}

export default ApiSecurity;
