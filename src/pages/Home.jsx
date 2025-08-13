import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaFire, FaCheckCircle, FaBell, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router";
import DataConsent from "../components/DataConsent";
// import { Link } from "react-router-dom"; // Link eklendi

function Home() {
  const navigate = useNavigate();
  const mainColor = "#0000ff"; // Header rengi
  const accentColor = "#ff9800"; // Uyumlu kontrast rengi (turuncu)

  const handleDataAccept = () => {
    console.log("Veri kullanımı kabul edildi");
  };

  const handleShowPrivacyPolicy = () => {
    navigate("/privacy-info");
  };

  const stats = [
    {
      icon: <FaBell size={50} color={accentColor} />,
      value: "112",
      text: "Toplam İhbar",
    },
    {
      icon: <FaFire size={50} color="#e53935" />,
      value: "78",
      text: "Doğrulanmış Yangın",
    },
    {
      icon: <FaCheckCircle size={50} color="#43a047" />,
      value: "24",
      text: "Kontrol Altında",
    },
    {
      icon: <FaChartBar size={50} color={mainColor} />,
      value: "10",
      text: "Analiz Edilen Rapor",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      {/* Hero Banner */}
      <div
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,255,0.7), rgba(0,0,255,0.7)), url('https://images.unsplash.com/photo-1503437313881-503a91226419')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "140px 0",
          textAlign: "center",
        }}
      >
        <h1 className="fw-bold display-3">🔥 Yangın İhbar Sistemi</h1>
        <p className="fs-4 mb-4">
          Yangınları anında bildir, doğayı ve yaşamı koru!
        </p>
        <Button
          size="lg"
          className="fw-bold px-4"
          style={{
            backgroundColor: accentColor,
            borderColor: accentColor,
            color: "white",
            fontSize: "1.2rem",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
          onClick={() => window.location.href = '/about'}
        >
          📢 Detaylı Bilgi
        </Button>
      </div>

      {/* İstatistik Kartları */}
      <Container className="py-5">
        <Row className="g-4">
          {stats.map((item, idx) => (
            <Col lg={3} md={6} key={idx}>
              <Card
                className="text-center shadow border-0 h-100"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  borderRadius: "15px",
                  padding: "10px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Body>
                  <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                  <h2 className="mt-3 fw-bold">{item.value}</h2>
                  <p className="text-muted fs-5">{item.text}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Bilgilendirme Bölümü */}
      <Container className="mb-5">
        <Card className="shadow border-0" style={{ borderRadius: "15px" }}>
          <Card.Body className="p-5">
            <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
              🚨 Neden Yangın İhbar Sistemi?
            </h3>
            <p className="fs-5 text-secondary">
              Yangınlar doğaya, canlılara ve insan yaşamına büyük zarar verir.
              Erken ihbar ile müdahale süresi kısalır, hasar en aza iner.
            </p>
            <Button
              size="lg"
              className="fw-bold px-4 mt-3"
              style={{
                backgroundColor: mainColor,
                borderColor: mainColor,
                boxShadow: "0 6px 18px rgba(0,0,255,0.4)",
              }}
            >
              📍 İhbar Formunu Aç
            </Button>
          </Card.Body>
        </Card>
      </Container>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#001f4d", // koyu mavi
          color: "white",
          textAlign: "center",
          padding: "20px 0",
          fontSize: "0.9rem",
        }}
      >
        © 2025 Yangın İhbar Sistemi | Tüm Hakları Saklıdır
      </footer>

      {/* Veri Kullanım Onayı */}
      <DataConsent 
        onAccept={handleDataAccept}
        onShowPolicy={handleShowPrivacyPolicy}
      />
    </div>
  );
}

export default Home;