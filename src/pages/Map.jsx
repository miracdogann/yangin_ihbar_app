import React, { useEffect, useRef, useState, useCallback } from "react";
import { Container, Row, Col, Card, Badge, Button, ButtonGroup } from "react-bootstrap";

// API base URL
const base_api_url = "https://miracdogan.pythonanywhere.com/api/";

function Map() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);

  // Artık sadece API'den dinamik veriler kullanılıyor
  const [filteredFireData, setFilteredFireData] = useState([]); // Filtrelenmiş veriler
  const [activeFilter, setActiveFilter] = useState('tumu'); // Aktif filtre
  const [fireData, setFireData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const paginationRef = useRef(null);

  // API'den yangın verilerini çek
  const fetchFireData = async () => {
    try {
      setLoading(true);
      setApiError(null);
      
      console.log("🔄 API'ye istek gönderiliyor:", `${base_api_url}fire-report-all/`);
      
      const response = await fetch(`${base_api_url}fire-report-all/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("📡 API Response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Response text'ini önce al
      const responseText = await response.text();
      console.log("📄 Ham response text:", responseText.substring(0, 200) + "...");
      
      // JSON parse et
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("❌ JSON parse hatası:", jsonError);
        console.error("❌ Ham response:", responseText);
        throw new Error(`JSON parse hatası: ${jsonError.message}`);
      }
      console.log("📊 API'den gelen ham veri:", data);
      console.log("📊 Veri tipi:", typeof data, Array.isArray(data) ? "(Array)" : "(Object)");
      
      // API'nin farklı formatlarını kontrol et
      if (Array.isArray(data)) {
        setFireData(data);
        setFilteredFireData(data);
        console.log(`✅ Array formatında ${data.length} yangın verisi alındı`);
        console.log("🔥 İlk veri örneği:", data[0] || "Veri yok");
      } else if (Array.isArray(data.results)) {
        setFireData(data.results);
        setFilteredFireData(data.results);
        console.log(`✅ Paginated formatında ${data.results.length} yangın verisi alındı`);
        console.log("🔥 İlk veri örneği:", data.results[0] || "Veri yok");
      } else if (Array.isArray(data.data)) {
        setFireData(data.data);
        setFilteredFireData(data.data);
        console.log(`✅ Wrapped formatında ${data.data.length} yangın verisi alındı`);
        console.log("🔥 İlk veri örneği:", data.data[0] || "Veri yok");
      } else if (data.message === 'Yanginlar Api') {
        // API henüz veri döndürmüyor, sadece mesaj var
        setFireData([]);
        setFilteredFireData([]);
        setApiError(null);
        console.log("ℹ️ API çalışıyor ancak henüz yangın verisi yok:", data.message);
      } else {
        console.error("❌ API beklenmedik formatta veri döndürdü:", data);
        throw new Error("API beklenmedik formatta veri döndürdü");
      }
      
    } catch (error) {
      console.error("❌ API Hatası:", error);
      console.error("❌ Hata detayı:", error.message);
      setFireData([]); // Boş array - API olmadan çalışmaz
      setFilteredFireData([]);
      setApiError(`API hatası: ${error.message}`);
    } finally {
      setLoading(false);
      console.log("🏁 API çağrısı tamamlandı");
    }
  };

  // Component mount olduğunda API'den veri çek
  useEffect(() => {
    fetchFireData();
  }, []);

  // Filtreleme fonksiyonu
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Filtre değiştiğinde sayfayı sıfırla
    if (filter === 'tumu') {
      setFilteredFireData(fireData);
    } else {
      setFilteredFireData(fireData.filter(fire => fire.status === filter));
    }
  };

  // Sayfa değiştiğinde üste scroll yap
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Pagination bölümüne scroll yap
    setTimeout(() => {
      paginationRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // Haritaya marker ekle
  const addMarkersToMap = useCallback((mapInstance) => {
    console.log("🗺️ Haritaya marker ekleniyor. fireData uzunluğu:", fireData.length);
    
    // Önceki markerları temizle
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (fireData.length === 0) {
      console.log("⚠️ fireData boş, marker eklenemiyor");
      return;
    }

    fireData.forEach((fire, index) => {
      console.log(`📍 ${index + 1}/${fireData.length} marker işleniyor:`, {
        id: fire.id,
        user: fire.user_name_masked,
        lat: fire.latitude,
        lng: fire.longitude,
        status: fire.status
      });
      if (window.tt) {
        // TomTom için koordinat validasyonu ve parsing
        const lng = parseFloat(fire.longitude);
        const lat = parseFloat(fire.latitude);

        // Koordinat geçerliliğini kontrol et
        if (isNaN(lng) || isNaN(lat) || lng < -180 || lng > 180 || lat < -90 || lat > 90) {
          console.error(`Geçersiz koordinatlar: lng=${lng}, lat=${lat}`);
          return; // Bu marker'ı atla
        }

        const coordinates = [lng, lat];
        console.log(`📍 TomTom koordinatları: [${coordinates[0]}, ${coordinates[1]}]`);
        
        // Basit custom marker elementi oluştur
        const markerElement = document.createElement('div');
        
        // Status'e göre emoji ve renk belirle
        let emoji, borderColor;
        switch(fire.status) {
          case 'devam':
            emoji = '🔥';
            borderColor = '#FF5252'; // Kırmızı
            break;
          case 'mudahale':
            emoji = '🚨';
            borderColor = '#FF9800'; // Turuncu
            break;
          case 'sonduruldu':
            emoji = '✅';
            borderColor = '#4CAF50'; // Yeşil
            break;
          default:
            emoji = '❓';
            borderColor = '#9E9E9E'; // Gri
        }
        
        markerElement.innerHTML = emoji;
        markerElement.style.cssText = `
          font-size: 24px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: white;
          border-radius: 50%;
          border: 2px solid ${borderColor};
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        
        const marker = new window.tt.Marker(markerElement)
          .setLngLat(coordinates)
          .addTo(mapInstance);
          
        console.log(`✅ ${index + 1}/${fireData.length} marker başarıyla eklendi:`, {
          id: fire.id,
          coordinates: coordinates,
          status: fire.status,
          emoji: emoji
        });
          
        // Popup oluştur
        const popupContent = `
          <div style="padding: 10px; min-width: 250px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              ${fire.photo_url ? 
                `<img src="${fire.photo_url}" alt="${fire.user_name_masked}" 
                  style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 10px;">` 
                : 
                `<div style="width: 50px; height: 50px; border-radius: 50%; background: #e0e0e0; 
                  display: flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 24px;">
                  👤
                </div>`
              }
              <div>
                <h6 style="margin: 0; font-weight: bold;">${fire.user_name_masked}</h6>
                <small style="color: #666;">ID: #${fire.id}</small>
              </div>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 10px;">
              <p style="margin: 5px 0;">
                <strong>📍 Konum:</strong> ${fire.address || `${fire.latitude.toFixed(6)}, ${fire.longitude.toFixed(6)}`}
              </p>
              <p style="margin: 5px 0;">
                <strong>📊 Durum:</strong> 
                <span style="
                  background: ${
                    fire.status === 'devam' ? '#FF5252' : 
                    fire.status === 'mudahale' ? '#FF9800' : 
                    fire.status === 'sonduruldu' ? '#4CAF50' : '#9E9E9E'
                  }; 
                  color: white; 
                  padding: 2px 8px; 
                  border-radius: 12px;
                  font-size: 12px;
                ">
                  ${
                    fire.status === 'devam' ? '🔥 Devam Ediyor' : 
                    fire.status === 'mudahale' ? '🚨 Müdahale Ediliyor' : 
                    fire.status === 'sonduruldu' ? '✅ Söndürüldü' : '❓ Bilinmiyor'
                  }
                </span>
              </p>
            </div>
          </div>
        `;

        const popup = new window.tt.Popup()
          .setHTML(popupContent);

        marker.setPopup(popup);
        markersRef.current.push(marker);
      }
    });
  }, [fireData]);

  // Haritada yangın göster (listeden tıklandığında)
  const showFireOnMap = (fire) => {
    if (map) {
      const lng = parseFloat(fire.longitude);
      const lat = parseFloat(fire.latitude);
      
      // Koordinat geçerliliğini kontrol et
      if (!isNaN(lng) && !isNaN(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat >= -90) {
        const coordinates = [lng, lat];
        
        // Haritaya odaklan
        map.flyTo({
          center: coordinates,
          zoom: 14,
          duration: 1000
        });
        
        // Harita bölümüne scroll yap
        mapRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
        
        // İlgili marker'ın popup'ını aç
        const targetMarker = markersRef.current.find((marker, index) => {
          return fireData[index] && fireData[index].id === fire.id;
        });
        
        if (targetMarker) {
          setTimeout(() => {
            targetMarker.togglePopup();
          }, 1000);
        }
      }
    }
  };

  // İstatistik verileri
  const mapStats = [
    { icon: "🔥", title: "Devam Eden", value: fireData.filter(f => f.status === "devam").length.toString(), subtitle: "Acil", color: "#FF5252" },
    { icon: "🚨", title: "Müdahale", value: fireData.filter(f => f.status === "mudahale").length.toString(), subtitle: "İşlemde", color: "#FF9800" },
    { icon: "✅", title: "Söndürülen", value: fireData.filter(f => f.status === "sonduruldu").length.toString(), subtitle: "Başarılı", color: "#4CAF50" },
    { icon: "📊", title: "Toplam Bildirim", value: fireData.length.toString(), subtitle: "Son 24 saat", color: "#9C27B0" },
  ];

  // Yangın verilerine göre harita merkezi ve zoom hesapla
  const calculateMapCenter = useCallback(() => {
    if (fireData.length === 0) {
      return {
        center: [35.2433, 38.9637], // Türkiye merkezi
        zoom: 6
      };
    }

    if (fireData.length === 1) {
      const fire = fireData[0];
      const lng = parseFloat(fire.longitude);
      const lat = parseFloat(fire.latitude);
      
      // Koordinat geçerliliğini kontrol et
      if (!isNaN(lng) && !isNaN(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
        return {
          center: [lng, lat],
          zoom: 12
        };
      } else {
        // Geçersiz koordinat durumunda Türkiye merkezi
        return {
          center: [35.2433, 38.9637],
          zoom: 6
        };
      }
    }

    // Birden fazla yangın varsa bounds hesapla
    const validCoords = fireData.filter(fire => {
      const lng = parseFloat(fire.longitude);
      const lat = parseFloat(fire.latitude);
      return !isNaN(lng) && !isNaN(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
    });

    if (validCoords.length === 0) {
      // Geçerli koordinat yoksa Türkiye merkezi
      return {
        center: [35.2433, 38.9637],
        zoom: 6
      };
    }

    let minLat = parseFloat(validCoords[0].latitude);
    let maxLat = parseFloat(validCoords[0].latitude);
    let minLng = parseFloat(validCoords[0].longitude);
    let maxLng = parseFloat(validCoords[0].longitude);

    validCoords.forEach(fire => {
      const lat = parseFloat(fire.latitude);
      const lng = parseFloat(fire.longitude);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Zoom seviyesini mesafeye göre hesapla
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);
    
    let zoom;
    if (maxDiff < 0.01) zoom = 13;
    else if (maxDiff < 0.1) zoom = 11;
    else if (maxDiff < 1) zoom = 9;
    else if (maxDiff < 3) zoom = 7;
    else zoom = 6;

    return {
      center: [centerLng, centerLat],
      zoom: zoom
    };
  }, [fireData]);

  useEffect(() => {
    const initializeMap = () => {
      // TomTom'un tam yüklenmesi için biraz bekle
      setTimeout(() => {
        console.log("🔄 Harita başlatılıyor...");
        console.log("- window.tt:", !!window.tt);
        console.log("- mapRef.current:", !!mapRef.current);
        
        if (window.tt && mapRef.current) {
          try {
            // Container'ı temizle
            mapRef.current.innerHTML = '';
            console.log("🧹 Container temizlendi");
            
            // Harita ayarları
            const mapOptions = {
              key: "vxNgHq8W1x8soPbMdhwWqgyDrT6ZVMXf",
              container: mapRef.current,
              center: [35.2433, 38.9637], // Türkiye merkezi
              zoom: 6
            };
            
            console.log("🗺️ TomTom harita oluşturuluyor...", mapOptions);
            
            const tomtomMap = window.tt.map(mapOptions);
            
            console.log("✅ TomTom map objesi oluşturuldu");
            setMap(tomtomMap);

          // Harita yüklendikten sonra markerları ekle
          tomtomMap.on('load', () => {
            console.log("🗺️ TomTom harita başarıyla yüklendi!");
            console.log("🔍 fireData uzunluğu:", fireData.length);
            
            if (fireData.length > 0) {
              console.log("🎯 Marker ekleme işlemi başlatılıyor...");
              addMarkersToMap(tomtomMap);
              
              // Birden fazla marker varsa tümünü gösterecek şekilde ayarla
              if (fireData.length > 1) {
                setTimeout(() => {
                  // Geçerli koordinatları topla
                  const validCoords = [];
                  fireData.forEach(fire => {
                    const lng = parseFloat(fire.longitude);
                    const lat = parseFloat(fire.latitude);
                    
                    // Koordinat geçerliliğini kontrol et
                    if (!isNaN(lng) && !isNaN(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
                      validCoords.push([lng, lat]);
                    }
                  });
                  
                  // En az 2 geçerli koordinat varsa bounds uygula
                  if (validCoords.length >= 2) {
                    try {
                      // Manuel bounds hesaplama (daha güvenli)
                      let minLng = validCoords[0][0];
                      let maxLng = validCoords[0][0];
                      let minLat = validCoords[0][1];
                      let maxLat = validCoords[0][1];
                      
                      validCoords.forEach(coord => {
                        minLng = Math.min(minLng, coord[0]);
                        maxLng = Math.max(maxLng, coord[0]);
                        minLat = Math.min(minLat, coord[1]);
                        maxLat = Math.max(maxLat, coord[1]);
                      });
                      
                      // SW ve NE köşeleri ile bounds oluştur - farklı constructor denemeleri
                      let bounds;
                      try {
                        // Method 1: SW, NE ile bounds
                        const sw = [minLng, minLat];
                        const ne = [maxLng, maxLat];
                        bounds = new window.tt.LngLatBounds(sw, ne);
                      } catch (e1) {
                        try {
                          // Method 2: Boş bounds + extend
                          bounds = new window.tt.LngLatBounds();
                          bounds.extend([minLng, minLat]);
                          bounds.extend([maxLng, maxLat]);
                        } catch (e2) {
                          // Method 3: Object format
                          bounds = new window.tt.LngLatBounds({
                            sw: [minLng, minLat],
                            ne: [maxLng, maxLat]
                          });
                        }
                      }
                      
                      tomtomMap.fitBounds(bounds, { 
                        padding: 80,
                        maxZoom: 12,
                        duration: 1000
                      });
                    } catch (boundsError) {
                      // Fallback: Merkez koordinata odaklan
                      const centerLng = validCoords.reduce((sum, coord) => sum + coord[0], 0) / validCoords.length;
                      const centerLat = validCoords.reduce((sum, coord) => sum + coord[1], 0) / validCoords.length;
                      
                      tomtomMap.flyTo({
                        center: [centerLng, centerLat],
                        zoom: 10,
                        duration: 1000
                      });
                    }
                  } else if (validCoords.length === 1) {
                    // Tek geçerli koordinat varsa ona odaklan
                    tomtomMap.flyTo({
                      center: validCoords[0],
                      zoom: 12,
                      duration: 1000
                    });
                  }
                }, 1000);
              } else {
                // Tek marker varsa ona odaklan
                const fire = fireData[0];
                const lng = parseFloat(fire.longitude);
                const lat = parseFloat(fire.latitude);
                
                // Koordinat geçerliliğini kontrol et
                if (!isNaN(lng) && !isNaN(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
                  const coord = [lng, lat];
                  console.log(`🎯 Tek marker'a odaklanılıyor: [${coord[0]}, ${coord[1]}]`);
                  tomtomMap.flyTo({
                    center: coord,
                    zoom: 12,
                    duration: 1000
                  });
                }
              }
            }
          });
        } catch (error) {
          console.error("Error creating TomTom map:", error);
          showDemoMap();
        }
      } else {
        console.log("❌ TomTom not loaded or mapRef not available");
        console.log("- window.tt:", window.tt ? "✅ Loaded" : "❌ Not loaded");
        console.log("- mapRef.current:", mapRef.current ? "✅ Available" : "❌ Not available");
      }
      }, 1000);
    }; 

    const showDemoMap = () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <div style="
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            border-radius: 25px;
          ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🗺</div>
            <h3 style="margin-bottom: 1rem; font-weight: bold; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Demo Harita</h3>
            <p style="margin-bottom: 2rem; opacity: 0.95; max-width: 400px; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
              TomTom harita servisi yüklenirken sorun oluştu. 
              Bu alanda interaktif harita görüntülenecektir.
            </p>
            <div style="
              background: rgba(255,255,255,0.2);
              padding: 1rem 2rem;
              border-radius: 10px;
              font-size: 0.9rem;
              color: white;
              font-weight: 500;
              text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            ">
              📍 Manisa Merkez: 38.6191°N, 27.4280°E
            </div>
          </div>
        `;
      }
    };

    // TomTom SDK yükleme
    const loadTomTomSDK = () => {
      console.log("🚀 TomTom SDK yükleniyor...");
      
      // Önce CSS yükle
      const loadCSS = () => {
        return new Promise((resolve, reject) => {
          if (document.getElementById("tomtom-css")) {
            console.log("ℹ️ CSS zaten yüklü");
            resolve();
            return;
          }
          
          const css = document.createElement("link");
          css.id = "tomtom-css";
          css.rel = "stylesheet";
          css.type = "text/css";
          css.href = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps.css";
          css.onload = () => {
            console.log("✅ TomTom CSS yüklendi");
            resolve();
          };
          css.onerror = () => {
            console.error("❌ TomTom CSS yüklenemedi");
            reject();
          };
          document.head.appendChild(css);
        });
      };
      
      // Sonra JS yükle
      const loadJS = () => {
        return new Promise((resolve, reject) => {
          if (window.tt) {
            console.log("ℹ️ TomTom JS zaten yüklü");
            resolve();
            return;
          }
          
          const script = document.createElement("script");
          script.src = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js";
          script.onload = () => {
            console.log("✅ TomTom JS yüklendi");
            // Biraz bekle ki tam initialize olsun
            setTimeout(() => {
              if (window.tt) {
                console.log("✅ window.tt hazır");
                resolve();
              } else {
                console.error("❌ window.tt yok");
                reject();
              }
            }, 500);
          };
          script.onerror = () => {
            console.error("❌ TomTom JS yüklenemedi");
            reject();
          };
          document.head.appendChild(script);
        });
      };
      
      // CSS ve JS'i sırayla yükle
      loadCSS()
        .then(() => loadJS())
        .then(() => {
          console.log("🎯 TomTom SDK hazır, harita başlatılıyor...");
          initializeMap();
        })
        .catch(() => {
          console.error("❌ TomTom SDK yüklenemedi, demo harita gösteriliyor");
          showDemoMap();
        });
    };

    console.log("🎬 Map useEffect başlatıldı");
    console.log("🔍 Mevcut fireData uzunluğu:", fireData.length);
    
    loadTomTomSDK();

    return () => {
      console.log("🧹 Map cleanup çalışıyor");
      if (map) {
        console.log("🗑️ TomTom map temizleniyor");
        map.remove();
      }
    };
  }, []);

  // fireData değiştiğinde markerları güncelle
  useEffect(() => {
    if (map && fireData.length > 0) {
      addMarkersToMap(map);
    }
  }, [fireData, map, addMarkersToMap]);

  // Loading durumu
  if (loading) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-sm">
              <div className="card-body py-5">
                <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
                  <span className="visually-hidden">Yükleniyor...</span>
                </div>
                <h4 className="mb-2">Yangın Verileri Yükleniyor...</h4>
                <p className="text-muted mb-0">API'den son veriler çekiliyor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Container fluid className="py-5 bg-primary text-white" style={{ 
        background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 100, 0.7)), url('https://images.unsplash.com/photo-1503437313881-503a91226419') center/cover no-repeat",
        minHeight: "60vh"
      }}>
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} style={{ color: "white" }}>
              <div className="mb-4">
                <Badge bg="light" text="primary" className="px-3 py-2 rounded-pill mb-3" style={{ fontSize: "1rem" }}>
                  🗺 {apiError ? 'API Hatalı' : fireData.length > 0 ? 'Gerçek Zamanlı' : 'API Hazır'} Harita
                </Badge>
              </div>
              <h1 className="display-4 fw-bold mb-4" style={{ 
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: "3.2rem",
                letterSpacing: "0.5px"
              }}>
                İnteraktif Yangın Haritası
              </h1>
              <h2 className="h3 fw-normal mb-4" style={{ 
                color: "#f8f9fa",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                fontSize: "1.6rem"
              }}>
                <span style={{ 
                  color: "#ffc107", 
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.4)"
                }}>
                  {apiError ? 'Demo veri' : 'Anlık veri'}
                </span> ile müdahale planlama
              </h2>
              <p className="lead mb-4" style={{ 
                maxWidth: "600px", 
                color: "white", 
                opacity: "0.98",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                fontWeight: "400"
              }}>
                TomTom harita teknolojisi ile desteklenen sistemimiz, yangın istasyonlarının konumlarını, durumlarını ve müdahale kapasitelerini {apiError ? 'demo verilerle' : 'gerçek zamanlı olarak'} görüntüler. Herhangi bir istasyona tıklayarak detaylı bilgilere ulaşabilirsiniz.
              </p>
              {apiError && (
                <div className="alert alert-warning d-inline-block" role="alert">
                  <small>
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    {apiError} - Demo veriler gösteriliyor
                  </small>
                </div>
              )}
            </Col>
            <Col lg={4} className="text-center">
              <div className="position-relative">
                <div className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "200px", height: "200px" }}>
                  <div style={{ fontSize: "4rem" }}>🗺️</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* İstatistikler */}
      <Container className="py-5">
        {/* API Durum Bilgisi ve Yenileme Butonu */}
        <Row className="mb-4">
          <Col className="text-center">
                         <div className="d-flex justify-content-center mb-4">
               <div className="d-flex align-items-center" style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 borderRadius: '50px',
                 padding: '12px 24px',
                 boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                 border: '2px solid rgba(255, 255, 255, 0.2)',
                 backdropFilter: 'blur(10px)',
                 minWidth: '320px',
                 position: 'relative',
                 overflow: 'hidden'
               }}>
                 {/* Arka plan animasyonu */}
                 <div style={{
                   position: 'absolute',
                   top: '0',
                   left: '0',
                   right: '0',
                   bottom: '0',
                   background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                   animation: 'shimmer 2s infinite',
                   zIndex: '1'
                 }}></div>
                 
                 <div className="d-flex align-items-center gap-4" style={{ position: 'relative', zIndex: '2' }}>
                                       {/* Durum göstergesi */}
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: apiError ? '#ff6b6b' : fireData.length > 0 ? '#51cf66' : '#ffd43b',
                        boxShadow: `0 0 20px ${apiError ? '#ff6b6b' : fireData.length > 0 ? '#51cf66' : '#ffd43b'}`,
                        animation: 'pulse 2s infinite',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}></div>
                      
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ 
                          fontSize: '1.4rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}>
                          {apiError ? '🔴' : fireData.length > 0 ? '🟢' : '🟡'}
                        </div>
                        <span style={{ 
                          color: 'white', 
                          fontWeight: '600', 
                          fontSize: '0.95rem',
                          letterSpacing: '0.5px',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>
                          {apiError ? 'API Hatası' : fireData.length > 0 ? 'Canlı Veri' : 'API Hazır'}
                        </span>
                      </div>
                    </div>
                   
                   {/* Ayırıcı çizgi */}
                   <div style={{
                     width: '1px',
                     height: '24px',
                     background: 'rgba(255, 255, 255, 0.3)'
                   }}></div>
                   
                                       {/* Veri sayısı */}
                    {fireData.length > 0 && (
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ 
                          fontSize: '1.3rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}>📊</div>
                        <span style={{ 
                          color: 'white', 
                          fontWeight: '700', 
                          fontSize: '1rem',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>
                          {fireData.length} veri
                        </span>
                      </div>
                    )}
                    
                    {fireData.length === 0 && !apiError && (
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ 
                          fontSize: '1.3rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}>⏳</div>
                        <span style={{ 
                          color: 'white', 
                          fontWeight: '600', 
                          fontSize: '0.95rem',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>
                          Veri bekleniyor
                        </span>
                      </div>
                    )}
                   
                   {/* Ayırıcı çizgi */}
                   <div style={{
                     width: '1px',
                     height: '24px',
                     background: 'rgba(255, 255, 255, 0.3)'
                   }}></div>
                   
                                       {/* Yenileme butonu */}
                    <button 
                      onClick={fetchFireData}
                      disabled={loading}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                      }}
                      onMouseEnter={e => !loading && (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
                      onMouseLeave={e => !loading && (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
                    >
                      {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
                          <span className="visually-hidden">Yükleniyor...</span>
                        </div>
                      ) : (
                        <svg 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          style={{ 
                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={e => e.target.style.transform = 'rotate(180deg)'}
                          onMouseLeave={e => e.target.style.transform = 'rotate(0deg)'}
                        >
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                          <path d="M21 3v5h-5"/>
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                          <path d="M3 21v-5h5"/>
                        </svg>
                      )}
                    </button>
                 </div>
               </div>
             </div>
             
                           <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
                
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
                }
              `}</style>
          </Col>
        </Row>
        
        <Row className="g-4 mb-5">
          {mapStats.map((stat, index) => (
            <Col key={index} lg={3} md={6}>
              <Card className="text-center border-0 h-100" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", transition: "transform 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Card.Body className="p-4">
                  <div style={{ 
                    fontSize: "3.2rem", 
                    marginBottom: "1rem",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  }}>{stat.icon}</div>
                  <h2 className="fw-bold mb-2" style={{ 
                    color: stat.color, 
                    fontSize: "2.8rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    fontWeight: "800"
                  }}>{stat.value}</h2>
                  <h5 className="mb-2" style={{ 
                    color: "#1a1a1a", 
                    fontWeight: "700",
                    fontSize: "1.2rem",
                    letterSpacing: "0.3px"
                  }}>{stat.title}</h5>
                  <small style={{ 
                    color: "#495057", 
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    opacity: "0.9"
                  }}>{stat.subtitle}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Harita Bölümü */}
      <Container className="py-5">
        <Row>
          <Col>
            <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: "25px" }}>
              <Card.Header className="bg-gradient text-center py-4" style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
                color: "white",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background: "#3191E6",
                  zIndex: "1"
                }}></div>
                <div style={{ position: "relative", zIndex: "2" }}>
                  <h3 className="mb-2 fw-bold" style={{ 
                    color: "white", 
                    fontSize: "1.8rem",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.94)",
                    letterSpacing: "0.5px"
                  }}>
                    🗺️ İnteraktif Yangın Haritası
                  </h3>
                  <p className="mb-0" style={{ 
                    color: "white", 
                    opacity: "0.95",
                    fontSize: "1.1rem",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    fontWeight: "500"
                  }}>
                    Canlı konum ve durum takibi
                  </p>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div 
                  ref={mapRef} 
                  style={{ 
                    height: "600px",
                    width: "100%",
                    position: "relative",
                    border: "1px solid #ddd",
                    borderRadius: "0 0 25px 25px",
                    overflow: "hidden"
                  }}
                ></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Yangın Bildirimleri Listesi */}
      <Container className="py-5">
        <Row>
          <Col>
            <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: "25px" }}>
              <Card.Header className="bg-gradient text-center py-4" style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
                color: "white",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background: "#3191E6",
                  zIndex: "1"
                }}></div>
                <div style={{ position: "relative", zIndex: "2" }}>
                  <h3 className="mb-2 fw-bold" style={{ 
                    color: "white", 
                    fontSize: "1.8rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    letterSpacing: "0.5px"
                  }}>
                    🔥 Yangın Bildirimleri Listesi
                  </h3>
                  <p className="mb-0" style={{ 
                    color: "white", 
                    opacity: "0.95",
                    fontSize: "1.1rem",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    fontWeight: "500"
                  }}>
                    Son bildirilen yangın vakaları
                  </p>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                {fireData.length === 0 ? (
                  <div className="text-center py-5">
                    {apiError ? (
                      <>
                        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
                        <h4 style={{ color: "#dc3545", fontWeight: "bold" }}>API Bağlantı Hatası</h4>
                        <p style={{ color: "#6c757d" }}>{apiError}</p>
                        <button 
                          className="btn btn-primary rounded-pill"
                          onClick={fetchFireData}
                          disabled={loading}
                        >
                          Tekrar Dene
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🟡</div>
                        <h4 style={{ color: "#ffc107", fontWeight: "bold" }}>API Hazır - Veri Bekleniyor</h4>
                        <p style={{ color: "#6c757d" }}>
                          API başarıyla bağlandı ancak henüz yangın bildirimi bulunmuyor.<br/>
                          Sistem gerçek veriler için hazır durumda.
                        </p>
                        <button 
                          className="btn btn-outline-primary rounded-pill"
                          onClick={fetchFireData}
                          disabled={loading}
                        >
                          Verileri Kontrol Et
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Filtreleme Butonları */}
                    <div className="mb-4">
                      <ButtonGroup className="w-100 justify-content-center">
                        <Button
                          variant={activeFilter === 'tumu' ? 'primary' : 'outline-primary'}
                          onClick={() => handleFilterChange('tumu')}
                          className="rounded-pill mx-1"
                        >
                          Tümü ({fireData.length})
                        </Button>
                        <Button
                          variant={activeFilter === 'devam' ? 'danger' : 'outline-danger'}
                          onClick={() => handleFilterChange('devam')}
                          className="rounded-pill mx-1"
                        >
                          🔥 Devam Eden ({fireData.filter(f => f.status === 'devam').length})
                        </Button>
                        <Button
                          variant={activeFilter === 'mudahale' ? 'warning' : 'outline-warning'}
                          onClick={() => handleFilterChange('mudahale')}
                          className="rounded-pill mx-1"
                          style={{ color: activeFilter === 'mudahale' ? 'white' : '#FF9800', borderColor: '#FF9800' }}
                        >
                          🚨 Müdahale Ediliyor ({fireData.filter(f => f.status === 'mudahale').length})
                        </Button>
                        <Button
                          variant={activeFilter === 'sonduruldu' ? 'success' : 'outline-success'}
                          onClick={() => handleFilterChange('sonduruldu')}
                          className="rounded-pill mx-1"
                        >
                          ✅ Söndürüldü ({fireData.filter(f => f.status === 'sonduruldu').length})
                        </Button>
                      </ButtonGroup>
                    </div>

                    {/* Pagination */}
                    <div ref={paginationRef} className="mb-4">
                      <Row className="align-items-center">
                        <Col md={6}>
                          <p className="mb-0" style={{ color: "#6c757d" }}>
                            Toplam <strong style={{ color: "#495057" }}>{filteredFireData.length}</strong> bildirim - Sayfa <strong style={{ color: "#495057" }}>{currentPage}</strong> / <strong style={{ color: "#495057" }}>{Math.ceil(filteredFireData.length / itemsPerPage)}</strong>
                          </p>
                        </Col>
                        <Col md={6} className="text-end">
                          {Math.ceil(filteredFireData.length / itemsPerPage) > 1 && (
                            <nav>
                              <ul className="pagination mb-0 justify-content-end">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                  <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                  >
                                    Önceki
                                  </button>
                                </li>
                                {Array.from({ length: Math.ceil(filteredFireData.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
                                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button 
                                      className="page-link" 
                                      onClick={() => handlePageChange(page)}
                                    >
                                      {page}
                                    </button>
                                  </li>
                                ))}
                                <li className={`page-item ${currentPage === Math.ceil(filteredFireData.length / itemsPerPage) ? 'disabled' : ''}`}>
                                  <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(filteredFireData.length / itemsPerPage)}
                                  >
                                    Sonraki
                                  </button>
                                </li>
                              </ul>
                            </nav>
                          )}
                        </Col>
                      </Row>
                    </div>

                    {/* Fire Data Cards */}
                    <Row className="g-4">
                      {filteredFireData
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((fire) => (
                        <Col key={fire.id} md={6} lg={4}>
                          <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "15px", transition: "transform 0.3s ease" }}
                            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                          >
                            <Card.Body className="p-3">
                              <div className="d-flex align-items-center mb-3">
                                {fire.photo_url ? (
                                  <img 
                                    src={fire.photo_url} 
                                    alt={fire.user_name_masked}
                                    style={{ 
                                      width: "50px", 
                                      height: "50px", 
                                      borderRadius: "50%", 
                                      objectFit: "cover",
                                      marginRight: "12px"
                                    }}
                                  />
                                ) : (
                                  <div style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    background: "#e0e0e0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "12px",
                                    fontSize: "24px"
                                  }}>
                                    👤
                                  </div>
                                )}
                                <div className="flex-grow-1">
                                  <h6 className="mb-0 fw-bold" style={{ color: "#212529" }}>{fire.user_name_masked}</h6>
                                  <small style={{ color: "#6c757d" }}>ID: #{fire.id}</small>
                                </div>
                              </div>
                              
                              <div className="mb-3">
                                <p className="mb-2 small">
                                  <strong style={{ color: "#495057" }}>📍 Konum:</strong><br />
                                  <span style={{ color: "#6c757d" }}>
                                    {fire.address || `${fire.latitude.toFixed(4)}, ${fire.longitude.toFixed(4)}`}
                                  </span>
                                </p>
                                <div className="d-flex align-items-center mb-3">
                                  <strong className="me-2" style={{ color: "#495057" }}>📊 Durum:</strong>
                                  <Badge 
                                    bg={
                                      fire.status === 'devam' ? 'danger' : 
                                      fire.status === 'mudahale' ? 'warning' : 
                                      fire.status === 'sonduruldu' ? 'success' : 'secondary'
                                    }
                                    className="d-flex align-items-center"
                                  >
                                    {
                                      fire.status === 'devam' ? '🔥 Devam Ediyor' : 
                                      fire.status === 'mudahale' ? '🚨 Müdahale Ediliyor' : 
                                      fire.status === 'sonduruldu' ? '✅ Söndürüldü' : '❓ Bilinmiyor'
                                    }
                                  </Badge>
                                </div>
                              </div>
                              
                              <button 
                                className="btn btn-primary btn-sm w-100 rounded-pill"
                                onClick={() => showFireOnMap(fire)}
                              >
                                <i className="bi bi-geo-alt me-1"></i>
                                Haritada Göster
                              </button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Map;