import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  const teamMembers = [
    {
      name: "Mehmet Kıvrak",
      role: "Frontend Developer",
      description: "Web Site ve Mobil Uygulama Geliştirme",
      expertise: ["React", "Node.js", "UI/UX Tasarım"],
      image: "/images/about/Mehmet.jpg"
    },
    {
      name: "Miraç Doğan",
      role: "Yazılım Geliştirici", 
      description: "Uzman yazılım geliştirici ve sistem mimarı",
      expertise: ["React", "Node.js", "Mobil Uygulama Geliştirme"],
      image: "/images/about/mirac.jpg"
    },
    {
      name: "Kerem Işık",
      role: "Siber Güvenlik Uzmanı",
      description: "Yangın verileri analizi ve modelleme uzmanı",
      expertise: ["Veri Analizi", "MCP Uzmanı", "Siber Güvenlik"],
      image: "/images/about/kerem.jpg"
    },
    {
      name: "Tolga Yılmaz",
      role: "Mobil Uygulama Geliştirici",
      description: "Yangın verileri analizi ve modelleme uzmanı",
      expertise: ["React", "Node.js", "Mobil Uygulama Geliştirme"],
      image: "/images/about/tolga.png"
    },{
      name: "Burak Efe Kılıç",
      role: "Frontend Developer",
      description: "Web Site ve Mobil Uygulama Geliştirme",
      expertise: ["React", "Node.js", "Web Site Geliştirme"],
      image: "/images/about/burak.png"
    },{
      name: "Fevzi Bağrıaçık",
      role: "Backend Developer",
      description: "Web Site ve Mobil Uygulama Geliştirme",
      expertise: ["React", "Node.js", "Mobil Uygulama Geliştirme"],
      image: "/images/about/fevzi.jpg"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Misyon",
      description: "Teknoloji ile yangın güvenliğini artırarak can ve mal kayıplarını minimuma indirmek"
    },
    {
      icon: "👁️",
      title: "Vizyon", 
      description: "Türkiye'nin en güvenilir yangın erken uyarı sistemi olmak"
    },
    {
      icon: "💡",
      title: "İnovasyon",
      description: "Sürekli gelişen teknoloji ile yangın güvenliğinde öncü çözümler sunmak"
    },
    {
      icon: "🤝",
      title: "İşbirliği",
      description: "Kamu, özel sektör ve vatandaşlarla güçlü işbirliği kurarak ortak hedeflere ulaşmak"
    }
  ];

  const achievements = [
    { number: "500+", label: "Aktif Sensör", color: "#FF6B6B" },
    { number: "99.8%", label: "Doğruluk Oranı", color: "#4ECDC4" },
    { number: "24/7", label: "Kesintisiz İzleme", color: "#45B7D1" },
    { number: "5 dk", label: "Ortalama Müdahale Süresi", color: "#FFA726" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Container fluid className="py-5" style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "60vh"
      }}>
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="text-white">
              <div className="mb-4">
                <span className="badge bg-light text-primary px-3 py-2 rounded-pill mb-3">
                  🔥 Yangın İhbar Sistemi
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4">Hakkımızda</h1>
              <h2 className="h3 fw-normal mb-4 text-light">
                Teknoloji ile <span className="text-warning fw-bold">hayat kurtarıyoruz</span>
              </h2>
              <p className="lead mb-4" style={{ maxWidth: '600px' }}>
                YiSiS (Yangın İhbar Sistemi), modern teknoloji ve yapay zeka destekli çözümlerle 
                yangın tespiti ve erken uyarı hizmetleri sunan yenilikçi bir platformdur. 
                Amacımız, can ve mal güvenliğini en üst seviyede korumaktır.
              </p>
            </Col>
            <Col lg={4} className="text-center">
              <div className="position-relative">
                <div
                  className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{ width: '200px', height: '200px' }}
                >
                  <div style={{ fontSize: '4rem' }}>🚨</div>
                </div>
                <Row className="text-center mt-4">
                  <Col xs={6}>
                    <div className="text-warning">
                      <h3 className="fw-bold mb-1">2024</h3>
                      <small className="text-light">Kuruluş Yılı</small>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="text-warning">
                      <h3 className="fw-bold mb-1">50+</h3>
                      <small className="text-light">Aktif Proje</small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Değerlerimiz */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-4">Değerlerimiz</h2>
            <p className="lead text-muted">
              Güvenlik, teknoloji ve toplum yararı odaklı değerlerimiz
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          {values.map((value, index) => (
            <Col key={index} lg={3} md={6}>
              <Card className="h-100 border-0 text-center" style={{
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-4">
                  <div className="mb-4" style={{ fontSize: '3rem' }}>
                    {value.icon}
                  </div>
                  <h5 className="fw-bold mb-3">{value.title}</h5>
                  <p className="text-muted">{value.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Başarılarımız */}
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Başarılarımız</h2>
              <p className="lead text-muted">
                Rakamlarla YiSiS'in etkinliği
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {achievements.map((achievement, index) => (
              <Col key={index} lg={3} md={6} className="text-center">
                <div
                  className="bg-white rounded-4 p-4"
                  style={{
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    border: `3px solid ${achievement.color}`,
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h3 className="fw-bold mb-2" style={{ 
                    color: achievement.color, 
                    fontSize: '2.5rem' 
                  }}>
                    {achievement.number}
                  </h3>
                  <p className="text-muted fw-semibold mb-0">{achievement.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* Ekibimiz */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-4">Ekibimiz</h2>
            <p className="lead text-muted">
              Yangın güvenliği alanında uzman ekibimiz
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          {teamMembers.map((member, index) => (
            <Col key={index} lg={4} md={6}>
              <Card className="h-100 border-0 text-center" style={{
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-4">
                  <div className="mb-4">
                    <div
                      className="mx-auto rounded-circle overflow-hidden"
                      style={{ 
                        width: '120px', 
                        height: '120px',
                        border: '4px solid #e9ecef',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                      }}
                    >
                      <img 
                        src={member.image} 
                        alt={member.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        onError={(e) => {
                          // Eğer resim yüklenemezse varsayılan avatar göster
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 bg-primary bg-opacity-10"><span style="font-size: 3rem;">👨‍💼</span></div>';
                        }}
                      />
                    </div>
                  </div>
                  <h5 className="fw-bold mb-2">{member.name}</h5>
                  <h6 className="text-primary mb-3">{member.role}</h6>
                  <p className="text-muted mb-3">{member.description}</p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="badge bg-primary bg-opacity-10 text-primary px-3 py-2"
                        style={{ borderRadius: '15px' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Proje Konumu */}
      <Container fluid className="py-5" style={{ 
        background: "linear-gradient(135deg, #0000FF 0%, #4285F4 50%, #1976D2 100%)" 
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-white">
              <h2 className="display-5 fw-bold mb-4">Projemizin Geliştirildiği Konum</h2>
              <p className="lead mb-4">
                YiSiS projesi, Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu'nda geliştirilmektedir.
              </p>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2rem' }}>📍</div>
                  <div>
                    <h6 className="fw-bold mb-1">MCBU, Manisa</h6>
                    <small className="opacity-75">Teknik Bilimler Meslek Yüksekokulu</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2rem' }}>🏢</div>
                  <div>
                    <h6 className="fw-bold mb-1">Teknoloji Üssü</h6>
                    <small className="opacity-75">Modern yazılım geliştirme ortamı</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2rem' }}>🌍</div>
                  <div>
                    <h6 className="fw-bold mb-1">Küresel Erişim</h6>
                    <small className="opacity-75">Dünya standartlarında hizmet</small>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div
                className="bg-white rounded-4 p-3"
                style={{ 
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  overflow: 'hidden'
                }}
              >
                <div className="mb-3 text-center">
                  <h5 className="fw-bold text-dark mb-0">📍 Konum Haritası</h5>
                </div>
                <div 
                  className="rounded-3 overflow-hidden"
                  style={{ 
                    height: '300px',
                    border: '2px solid #e9ecef'
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.7842751344106!2d27.301098875652272!3d38.67682557177196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b9846605ea2d81%3A0xfced31d0ef106597!2sMCBU%2C%20Teknik%20Bilimler%20Meslek%20Y%C3%BCksekokulu!5e0!3m2!1str!2str!4v1754993967555!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="YiSiS Proje Konumu - MCBU Teknik Bilimler Meslek Yüksekokulu"
                  ></iframe>
                </div>
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <strong>YiSiS</strong> - Yangın İhbar Sistemi | MCBU, Manisa
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
