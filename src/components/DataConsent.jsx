import React, { useState, useEffect, useCallback } from "react";
import { Button, Card } from "react-bootstrap";
import { FaInfoCircle, FaShieldAlt } from "react-icons/fa";

const DataConsent = ({ onAccept, onShowPolicy }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Veri onayı kontrol et
    try {
      const dataConsent = localStorage.getItem('userDataConsent');
      if (!dataConsent) {
        // 1 saniye sonra göster (sayfa yüklendikten sonra)
        const timer = setTimeout(() => {
          setShow(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.warn('LocalStorage erişim hatası:', error);
      // LocalStorage erişimi yoksa popup'ı göster
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    try {
      localStorage.setItem('userDataConsent', 'accepted');
      setShow(false);
      if (onAccept) onAccept();
    } catch (error) {
      console.warn('LocalStorage erişim hatası:', error);
      setShow(false);
    }
  }, [onAccept]);

  const handleShowPolicy = useCallback(() => {
    if (onShowPolicy) onShowPolicy();
  }, [onShowPolicy]);

  if (!show) return null;

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
