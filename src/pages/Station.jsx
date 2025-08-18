import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// GÜVENLİK: Console loglarını tamamen kapat - API bilgileri gizlenmeli  
// TEMPORARY DEBUG: Development'ta loglama açık
const secureLog = {
  log: import.meta.env.MODE === 'development' ? console.log : () => {},
  warn: import.meta.env.MODE === 'development' ? console.warn : () => {},
  error: import.meta.env.MODE === 'development' ? console.error : () => {}
};

// GÜVENLİK: Client-side cache ve rate limiting
const API_CACHE_KEY = 'stations_cache';
const API_CACHE_DURATION = 5 * 60 * 1000; // 5 dakika

export default function Station() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        // GÜVENLİK: Cache kontrolü
        const cachedData = localStorage.getItem(API_CACHE_KEY);
        if (cachedData) {
          try {
            const { data: cachedStations, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < API_CACHE_DURATION) {
              setStations(cachedStations);
              setLoading(false);
              return;
            }
          } catch (cacheError) {
            localStorage.removeItem(API_CACHE_KEY);
          }
        }

        // GÜVENLİK: API endpoint'i environment variable'dan al
        const apiEndpoint = import.meta.env.VITE_API_STATIONS_URL || 
                           `${import.meta.env.VITE_API_BASE_URL}/api/stations/`;
        
        if (!apiEndpoint) {
          throw new Error('API endpoint not configured');
        }

        // Development'ta proxy kullan, production'da doğrudan API
        const finalEndpoint = import.meta.env.DEV 
          ? '/api/stations/' 
          : apiEndpoint;

        // Basit API çağrısı (CORS uyumlu)
        const response = await fetch(finalEndpoint, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(10000) // 10 saniye timeout
        });
        
        if (!response.ok) {
          throw new Error(`Bağlantı hatası: ${response.status}`);
        }
        
        // GÜVENLİK: Response size kontrolü
        const contentLength = response.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > 1048576) { // 1MB limit
          throw new Error('Response çok büyük');
        }

        const data = await response.json();
        
        // GÜVENLİK: Data type validation
        if (!data || typeof data !== 'object') {
          throw new Error('Geçersiz response formatı');
        }
        
        // Veri yapısını kontrol et ve uygun formatta parse et
        let stationsData = [];
        
        if (Array.isArray(data)) {
          stationsData = data;
        } else if (data && Array.isArray(data.results)) {
          stationsData = data.results;
        } else if (data && Array.isArray(data.data)) {
          stationsData = data.data;
        } else if (data && Array.isArray(data.stations)) {
          stationsData = data.stations;
        } else {
          setError("Veri formatı uyumsuz");
          setLoading(false);
          return;
        }
        
        // GÜVENLİK: Array size kontrolü
        if (stationsData.length > 1000) {
          throw new Error('Çok fazla veri');
        }
        
        // GÜVENLİK: Gelişmiş veri sanitization
        const validatedStations = stationsData
          .filter(station => {
            return station && 
                   typeof station === 'object' &&
                   typeof station.name === 'string' && 
                   typeof station.address === 'string' &&
                   station.name.length > 0 && 
                   station.name.length < 200 &&
                   station.address.length > 0 && 
                   station.address.length < 500;
          })
          .map(station => ({
            id: parseInt(station.id) || 0,
            name: String(station.name).trim().slice(0, 200),
            address: String(station.address).trim().slice(0, 500),
            phone_number: String(station.phone_number || '').trim().slice(0, 20),
            latitude: parseFloat(station.latitude) || 0,
            longitude: parseFloat(station.longitude) || 0
          }))
          .filter(station => {
            // GÜVENLİK: Koordinat doğrulama (Türkiye sınırları)
            return station.latitude >= 35 && station.latitude <= 43 &&
                   station.longitude >= 25 && station.longitude <= 45;
          });
        
        // GÜVENLİK: Başarılı response'u cache'le
        localStorage.setItem(API_CACHE_KEY, JSON.stringify({
          data: validatedStations,
          timestamp: Date.now()
        }));

        setStations(validatedStations);
        setError(null);
        
      } catch (err) {
        // GÜVENLİK: Error message sanitization
        let errorMessage = "Bağlantı sorunu";
        
        if (err.name === 'AbortError') {
          errorMessage = "Zaman aşımı";
        } else if (err.message.includes('Güvensiz API')) {
          errorMessage = "Güvenlik hatası";
        } else if (err.message.includes('Response çok büyük')) {
          errorMessage = "Veri boyutu çok büyük";
        } else if (err.message.includes('Geçersiz response')) {
          errorMessage = "Veri formatı hatalı";
        } else if (err.message.includes('Çok fazla veri')) {
          errorMessage = "Veri limiti aşıldı";
        } else if (err.message.includes('Rate limit')) {
          errorMessage = "Çok fazla istek gönderildi - lütfen bekleyin";
        } else if (err.message.includes('Şüpheli aktivite')) {
          errorMessage = "Güvenlik kontrolü başarısız";
        } else if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
          errorMessage = "Ağ bağlantısı sorunu";
        }
        
        setError(errorMessage);
        
        // GÜVENLİK: Güvenli retry mekanizması
        if (retryCount < 2 && !err.message.includes('Güvensiz API') && 
            !err.message.includes('Rate limit') && !err.message.includes('Şüpheli aktivite')) {
          const retryDelay = Math.min(2000 * Math.pow(2, retryCount), 10000); // Exponential backoff
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setLoading(true);
          }, retryDelay);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchStations();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="container my-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <h2 className="mt-3">İstasyon verileri yükleniyor...</h2>
          {retryCount > 0 && (
            <p className="text-muted">Yeniden deneme: {retryCount}/2</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger" role="alert">
          <h1 className="text-center text-danger">⚠️ Bağlantı Hatası</h1>
          <p className="text-center mb-3">{error}</p>
          <div className="text-center">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setRetryCount(0);
                setLoading(true);
                setError(null);
              }}
            >
              🔄 Tekrar Dene
            </button>
          </div>
        </div>
        
        {/* Demo veriler */}
        <div className="mt-4">
          <h3 className="text-center mb-4">🚒 Demo İstasyon Bilgileri</h3>
          <div className="row g-4">
            {[
              {
                id: 1,
                name: "Merkez İtfaiye İstasyonu",
                address: "Yunusemre, Manisa Merkez",
                phone_number: "02362123456",
                latitude: 38.6191,
                longitude: 27.4280
              },
              {
                id: 2,
                name: "Şehzadeler İtfaiye İstasyonu", 
                address: "Şehzadeler, Manisa",
                phone_number: "02362654321",
                latitude: 38.6098,
                longitude: 27.4387
              }
            ].map((station) => (
              <div key={station.id} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="card shadow-sm border-warning h-100"
                  style={{ backgroundColor: "#fff3cd", borderRadius: "12px" }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="badge bg-warning text-dark mb-2 align-self-start">Demo Veri</div>
                    <h5 className="card-title fw-bold mb-3" style={{ color: "#2c3e50" }}>
                      {station.name}
                    </h5>
                    <p className="card-text mb-2" style={{ color: "#34495e" }}>
                      <strong>Adres:</strong> {station.address}
                    </p>
                    <p className="card-text mb-4" style={{ color: "#34495e" }}>
                      <strong>Telefon:</strong>{" "}
                      <a
                        href={`tel:${station.phone_number}`}
                        className="btn btn-success btn-sm ms-2"
                        style={{ fontWeight: "600", borderRadius: "6px" }}
                      >
                        📞{station.phone_number}
                      </a>
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${station.latitude},${station.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-danger mt-auto align-self-start"
                      style={{
                        borderRadius: "8px",
                        padding: "0.5rem 1rem",
                        fontWeight: "600",
                      }}
                    >
                      📍 Haritada Gör
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h1 className="mb-3">🚒 İstasyonlar</h1>
        {stations.length > 0 && (
          <div className="badge bg-success fs-6 mb-3">
            ✅ {stations.length} istasyon bulundu
          </div>
        )}
      </div>
      
      <div className="row g-4">
        {stations.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h4>ℹ️ İstasyon Bulunamadı</h4>
              <p>API'den henüz istasyon verisi alınamadı.</p>
            </div>
          </div>
        ) : (
          stations.map((station) => (
            <div key={station.id} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
              >
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold mb-3"
                    style={{ color: "#2c3e50" }}
                  >
                    {station.name}
                  </h5>
                  <p
                    className="card-text mb-2"
                    style={{ color: "#34495e" }}
                  >
                    <strong>Adres:</strong> {station.address}
                  </p>

                  {/* Telefon numarası tıklanınca arama başlatır */}
                  <p className="card-text mb-4" style={{ color: "#34495e" }}>
                    <strong>Telefon:</strong>{" "}
                    <a
                      href={`tel:${station.phone_number}`}
                      className="btn btn-success btn-sm ms-2"
                      style={{ fontWeight: "600", borderRadius: "6px" }}
                    >
                      📞{station.phone_number}
                    </a>
                  </p>

                  <a
                    href={`https://maps.google.com/?q=${station.latitude},${station.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-danger mt-auto align-self-start"
                    style={{
                      borderRadius: "8px",
                      padding: "0.5rem 1rem",
                      fontWeight: "600",
                    }}
                  >
                    📍 Haritada Gör
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
