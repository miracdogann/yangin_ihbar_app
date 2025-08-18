import React, { useState, useEffect, useCallback } from "react";
import { Button, Card } from "react-bootstrap";
import { FaInfoCircle, FaShieldAlt } from "react-icons/fa";

// LocalStorage güvenli okuma fonksiyonu
const getLocalStorageItem = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  } catch (error) {
    // Güvenlik: Hata mesajları console'a yazdırılmıyor
    return null;
  }
};

// LocalStorage güvenli yazma fonksiyonu
const setLocalStorageItem = (key, value) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
      return true;
    }
    return false;
  } catch (error) {
    // Güvenlik: Hata mesajları console'a yazdırılmıyor
    return false;
  }
};

const DataConsent = ({ onAccept, onShowPolicy, forceShow = false, alwaysShow = false }) => {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Component mount edildiğini işaretle
    setMounted(true);
    
    // Veri onayı kontrol et
    const checkConsent = () => {
      // Eğer alwaysShow true ise, her zaman göster (test için)
      if (alwaysShow) {
        setShow(true);
        return;
      }
      
      // Eğer forceShow true ise, localStorage'a bakmadan göster
      if (forceShow) {
        setShow(true);
        return;
      }
      
      // Development modunda localhost'ta ilk açılışta göster
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const isDev = process.env.NODE_ENV === 'development';
      
      if (isDev && isLocalhost) {
        // Development'ta sessionStorage kullan (sayfa yenilenince sıfırlanır)
        const sessionConsent = sessionStorage.getItem('userDataConsentSession');
        if (!sessionConsent || sessionConsent !== 'accepted') {
          setShow(true);
          return;
        }
      }
      
      // Production'da localStorage kullan
      const dataConsent = getLocalStorageItem('userDataConsent');
      
      if (!dataConsent || dataConsent !== 'accepted') {
        // Popup'ı göster
        setShow(true);
      } else {
        // Onay varsa popup'ı gösterme
        setShow(false);
      }
    };

    // Kısa bir gecikme ile kontrol et (DOM hazır olduğundan emin olmak için)
    const timer = setTimeout(checkConsent, 100);
    
    return () => clearTimeout(timer);
  }, [forceShow, alwaysShow]);

  const handleAccept = useCallback(() => {
    const success = setLocalStorageItem('userDataConsent', 'accepted');
    
    // Development modunda sessionStorage'a da kaydet
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev && isLocalhost) {
      try {
        sessionStorage.setItem('userDataConsentSession', 'accepted');
      } catch (error) {
        // Güvenlik: Hata mesajları console'a yazdırılmıyor
      }
    }
    
    setShow(false);
    
    if (onAccept) {
      onAccept();
    }
    
    if (!success) {
      // Güvenlik: Başarısızlık mesajları console'a yazdırılmıyor
    }
  }, [onAccept]);

  const handleShowPolicy = useCallback(() => {
    if (onShowPolicy) onShowPolicy();
  }, [onShowPolicy]);

  const handleReset = useCallback(() => {
    // LocalStorage'daki onayı temizle ve popup'ı tekrar göster
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userDataConsent');
    }
    setShow(true);
  }, []);

  // Component mount edilene kadar hiçbir şey render etme
  if (!mounted) {
    return null;
  }
  
  // Popup gösterilmeyecekse null döndür
  if (!show) {
    return null;
  }

  return (
    <div
      className="data-consent-popup"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 9999,
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <Card
        className="shadow-lg border-0"
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e9ecef'
        }}
      >
        <Card.Body className="p-4">
          <div className="d-flex align-items-start">
            <div className="me-3">
              <FaShieldAlt 
                size={32} 
                style={{ color: '#ff9800' }}
              />
            </div>
            <div className="flex-grow-1">
              <h5 className="mb-2 fw-bold" style={{ color: '#0000ff' }}>
                🛡️ Veri Kullanım Bilgileri
              </h5>
              <p className="mb-3 text-muted" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                Sitemizde, deneyiminizi geliştirmek ve hizmetlerimizi sunmak için küçük veri dosyaları kullanılmaktadır. 
                Zorunlu dosyalar haricindeki veriler, açık rızanız ile işlenir ve dilediğiniz zaman tercihlerinizi değiştirebilirsiniz. 
                Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="fw-bold px-3"
                  style={{
                    backgroundColor: '#0000ff',
                    borderColor: '#0000ff',
                    borderRadius: '20px'
                  }}
                  onClick={handleAccept}
                >
                  ✅ Kabul Et
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="fw-bold px-3"
                  style={{
                    borderColor: '#0000ff',
                    color: '#0000ff',
                    borderRadius: '20px'
                  }}
                  onClick={handleShowPolicy}
                >
                  <FaInfoCircle className="me-1" />
                  Detaylı İncele
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DataConsent;
