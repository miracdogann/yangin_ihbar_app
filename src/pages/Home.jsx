import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaFire,
  FaCheckCircle,
  FaBell,
  FaChartBar,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    {
      icon: <FaBell className="text-warning" />,
      value: "0",
      text: "Toplam İhbar",
      id: 1,
    },
    {
      icon: <FaFire className="text-danger" />,
      value: "0",
      text: "Doğrulanmış Yangın",
      id: 2,
    },
    {
      icon: <FaCheckCircle className="text-success" />,
      value: "0",
      text: "Kontrol Altında",
      id: 3,
    },
    {
      icon: <FaChartBar className="text-primary" />,
      value: "0",
      text: "Analiz Edilen Rapor",
      id: 4,
    },
  ]);

  // İstatistikler için gerçekçi artış animasyonu
  useEffect(() => {
    const targetValues = [112, 78, 24, 10];
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const counters = targetValues.map((target, index) => {
      let step = 0;
      const increment = target / steps;
      let currentValue = 0;

      const intervalId = setInterval(() => {
        step += 1;
        currentValue = Math.min(target, Math.round(increment * step));

        setStats((prev) =>
          prev.map((stat) =>
            stat.id === index + 1
              ? { ...stat, value: currentValue.toString() }
              : stat
          )
        );

        if (step >= steps) clearInterval(intervalId);
      }, interval);

      return intervalId;
    });

    return () => counters.forEach(clearInterval);
  }, []);

  const features = [
    {
      icon: <FaBell className="text-primary fs-1" />,
      title: "Anında Bildirim",
      description: "Yangın ihbarları anında ilgili birimlere ulaşır",
    },
    {
      icon: <FaChartBar className="text-primary fs-1" />,
      title: "Detaylı Analiz",
      description: "İhbar verileri detaylı şekilde analiz edilir",
    },
    {
      icon: <FaFire className="text-primary fs-1" />,
      title: "Erken Müdahale",
      description: "Olası yangınlara karşı erken müdahale imkanı",
    },
  ];

  return (
    <div className="bg-light">
      {/* Hero Banner */}
      <section
        className="py-5 bg-primary text-white"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 100, 0.7)), url('https://images.unsplash.com/photo-1503437313881-503a91226419') center/cover no-repeat",
        }}
      >
        <Container>
          <Row className="justify-content-center text-center py-5">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                🔥 Yangın İhbar ve Erken Uyarı Sistemi
              </h1>
              <p className="lead mb-5">
                Yangınları anında bildir, müdahale süresini kısalt, doğayı ve
                yaşamı koru!
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <Button
                  variant="warning"
                  size="lg"
                  className="fw-bold px-4 rounded-pill"
                  onClick={() => navigate("/about")}
                >
                  <FaInfoCircle className="me-2" />
                  Detaylı Bilgi
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="fw-bold px-4 rounded-pill"
                  onClick={() => navigate("/contact")}
                >
                  <FaPhone className="me-2" />
                  İletişim
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* İstatistikler */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="fw-bold mb-3 position-relative pb-3">
                Sistem İstatistikleri
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x bg-warning rounded"
                  style={{ width: "80px", height: "4px" }}
                ></div>
              </h2>
              <p className="text-muted fs-5">
                Gerçek zamanlı yangın ihbar verileri ve müdahale istatistikleri
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {stats.map((item) => (
              <Col lg={3} md={6} key={item.id}>
                <Card className="h-100 shadow-sm border-0 text-center transition-all">
                  <Card.Body className="p-4">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="fw-bold display-5 text-dark mb-2">
                      {item.value}
                    </h3>
                    <p className="text-muted mb-0">{item.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Özellikler Bölümü */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="fw-bold mb-3 position-relative pb-3">
                Sistem Özellikleri
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x bg-primary rounded"
                  style={{ width: "80px", height: "4px" }}
                ></div>
              </h2>
              <p className="text-muted fs-5">
                Yangın ihbar sistemimizin hayat kurtaran özellikleri
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="h-100 shadow-sm border-0 text-center transition-all">
                  <Card.Body className="p-4">
                    <div className="mb-4">{feature.icon}</div>
                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Eylem Çağrısı */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">
                Yangınları Önlemek İçin Harekete Geçin
              </h2>
              <p className="lead mb-4">
                Erken bildirim, yangınların büyümeden kontrol altına alınmasını
                sağlar. Olası bir yangın durumunda hemen bildirimde bulunun.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="fw-bold px-5 rounded-pill"
                onClick={() => navigate("/contact")}
              >
                <FaPhone className="me-2" />
                Hemen İletişime Geçin
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Küçük bir CSS eklentisi - Bootstrap ile tamamlanamayan küçük dokunuşlar */}
      <style>{`
        .transition-all {
          transition: all 0.3s ease;
        }
        .transition-all:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        @media (max-width: 768px) {
          .display-4 { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Home;