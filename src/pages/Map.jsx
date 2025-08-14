import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export default function Map() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const mapStats = [
    { icon: "🔥", title: "Aktif Yangınlar", value: "0", subtitle: "Şu anda", color: "#4CAF50" },
    { icon: "⏱", title: "Ortalama Müdahale", value: "4.4 dk", subtitle: "Son 30 gün", color: "#2196F3" },
    { icon: "📊", title: "Risk Seviyesi", value: "Düşük", subtitle: "Şehir geneli", color: "#4CAF50" },
    { icon: "🚨", title: "Hazır İstasyonlar", value: "5", subtitle: "Müdahaleye hazır", color: "#9C27B0" },
  ];

  useEffect(() => {
    const loadMap = () => {
      if (window.tt && mapRef.current) {
        try {
          const tomtomMap = window.tt.map({
            key: "vxNgHq8W1x8soPbMdhwWqgyDrT6ZVMXf",
            container: mapRef.current,
            center: [27.4280, 38.6191], // Manisa merkezi
            zoom: 11,
          });
          setMap(tomtomMap);
        } catch (error) {
          console.error("Error creating TomTom map:", error);
          showDemoMap();
        }
      } else {
        console.log("TomTom not loaded or mapRef not available");
      }
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
            <h3 style="margin-bottom: 1rem; font-weight: bold;">Demo Harita</h3>
            <p style="margin-bottom: 2rem; opacity: 0.9; max-width: 400px;">
              TomTom harita servisi yüklenirken sorun oluştu. 
              Bu alanda interaktif harita görüntülenecektir.
            </p>
            <div style="
              background: rgba(255,255,255,0.2);
              padding: 1rem 2rem;
              border-radius: 10px;
              font-size: 0.9rem;
            ">
              📍 Manisa Merkez: 38.6191°N, 27.4280°E
            </div>
          </div>
        `;
      }
    };

    const loadTomTom = () => {
      // CSS yükle
      if (!document.getElementById("tomtom-css")) {
        const css = document.createElement("link");
        css.id = "tomtom-css";
        css.rel = "stylesheet";
        css.type = "text/css";
        css.href = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps.css";
        css.onerror = () => (css.href = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.24.0/maps/maps.css");
        document.head.appendChild(css);
      }

      // JS yükle
      if (!window.tt) {
        const script = document.createElement("script");
        script.src = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps-web.min.js";
        script.onload = () => loadMap();
        script.onerror = () => {
          const fallbackScript = document.createElement("script");
          fallbackScript.src = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.24.0/maps/maps-web.min.js";
          fallbackScript.onload = () => loadMap();
          fallbackScript.onerror = showDemoMap;
          document.head.appendChild(fallbackScript);
        };
        document.head.appendChild(script);
      } else {
        loadMap();
      }
    };

    loadTomTom();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Container fluid className="py-5" style={{ background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)", minHeight: "60vh" }}>
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="text-white">
              <div className="mb-4">
                <Badge bg="light" text="primary" className="px-3 py-2 rounded-pill mb-3" style={{ fontSize: "1rem" }}>
                  🗺 Gerçek Zamanlı Harita
                </Badge>
              </div>
              <h1 className="display-4 fw-bold mb-4">İnteraktif Yangın Haritası</h1>
              <h2 className="h3 fw-normal mb-4 text-light">
                <span className="text-warning fw-bold">Anlık veri</span> ile müdahale planlama
              </h2>
              <p className="lead mb-4" style={{ maxWidth: "600px" }}>
                TomTom harita teknolojisi ile desteklenen sistemimiz, yangın istasyonlarının konumlarını, durumlarını ve müdahale kapasitelerini gerçek zamanlı olarak görüntüler. Herhangi bir istasyona tıklayarak detaylı bilgilere ulaşabilirsiniz.
              </p>
            </Col>
            <Col lg={4} className="text-center">
              <div className="position-relative">
                <div className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "200px", height: "200px" }}>
                  <div style={{ fontSize: "4rem" }}>🗺</div>
                </div>
                <Row className="text-center mt-4">
                  <Col xs={6}><div className="text-warning"><h3 className="fw-bold mb-1">5</h3><small className="text-light">İzlenen Bölge</small></div></Col>
                  <Col xs={6}><div className="text-warning"><h3 className="fw-bold mb-1">24/7</h3><small className="text-light">Anlık Takip</small></div></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* İstatistikler */}
      <Container className="py-5">
        <Row className="g-4 mb-5">
          {mapStats.map((stat, index) => (
            <Col key={index} lg={3} md={6}>
              <Card className="text-center border-0 h-100" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", transition: "transform 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Card.Body className="p-4">
                  <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "70px", height: "70px", backgroundColor: `${stat.color}20`, borderRadius: "50%", fontSize: "2rem" }}>
                    {stat.icon}
                  </div>
                  <h3 className="fw-bold mb-2" style={{ color: stat.color }}>{stat.value}{stat.total && <span className="text-muted">/{stat.total}</span>}</h3>
                  <h6 className="fw-semibold mb-2">{stat.title}</h6>
                  {stat.subtitle && <p className="text-muted small mb-0">{stat.subtitle}</p>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Harita Bölümü */}
      <Container fluid className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row className="mb-4">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Canlı Yangın Takip Haritası</h2>
              <p className="lead text-muted">Çıkan yangınların konumlarını görmek ve detaylı bilgilere ulaşmak için harita üzerindeki işaretlere tıklayın</p>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="border-0" style={{ borderRadius: "25px", boxShadow: "0 15px 40px rgba(0,0,0,0.1)", overflow: "hidden" }}>
                <Card.Body className="p-0">
                  <div ref={mapRef} style={{ height: "500px", width: "100%", borderRadius: "25px" }}></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* İstasyon Listesi */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-4">Yangın Alanına Yakın İstasyonlar</h2>
            <p className="lead text-muted">Detaylı istasyon bilgileri yakında sizlerle buluşacak</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 text-center" style={{ borderRadius: "25px", boxShadow: "0 15px 40px rgba(0,0,0,0.1)", minHeight: "350px" }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center p-5">
                <div className="mb-4" style={{ fontSize: "4rem", opacity: 0.3 }}>🚨</div>
                <h3 className="fw-bold mb-3" style={{ color: "#1976d2" }}>İstasyon Bilgileri Yakında</h3>
                <p className="lead text-muted mb-4" style={{ maxWidth: "400px" }}>Yangın Haritasının detaylı bilgileri, ekipman durumları ve personel bilgileri çok yakında burada yer alacak.</p>
                <Row className="text-center mt-3" style={{ maxWidth: "400px" }}>
                  <Col xs={4}><div><div className="fw-bold h5" style={{ color: "#4CAF50" }}>🚒</div><small className="text-muted">Araç Bilgileri</small></div></Col>
                  <Col xs={4}><div><div className="fw-bold h5" style={{ color: "#FF9800" }}>👨‍🚒</div><small className="text-muted">Personel Durumu</small></div></Col>
                  <Col xs={4}><div><div className="fw-bold h5" style={{ color: "#2196F3" }}>⚡</div><small className="text-muted">Hazırlık Durumu</small></div></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}