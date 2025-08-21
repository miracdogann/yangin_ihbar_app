import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export default function Sustainability() {
  const sdgGoals = [
    {
      image: "/images/sustainability/sdg3.png",
      number: "SDG 3",
      title: "Sağlıklı ve Kaliteli Yaşam",
      description: "Herkes için sağlıklı yaşam ve refahı teşvik etmek",
      ourContribution: "Yangın duman zehirlenmelerini önler ve acil müdahale süresini kısaltarak can kayıplarını azaltır.",
      color: "#4CAF50",
      bgColor: "#E8F5E8"
    },
    {
      image: "/images/sustainability/sdg11.png",
      number: "SDG 11",
      title: "Sürdürülebilir Şehirler",
      description: "Şehirleri kapsayıcı, güvenli ve sürdürülebilir kılmak",
      ourContribution: "Akıllı şehir altyapısına entegre edilerek kentsel yangın risklerini minimize eder.",
      color: "#FF9800",
      bgColor: "#FFF3E0"
    },
    {
      image: "/images/sustainability/sdg13.png",
      number: "SDG 13",
      title: "İklim Eylemi",
      description: "İklim değişikliği ve etkileriyle mücadele için acil eylemler",
      ourContribution: "Yangın erken tespit sistemiyle orman yangınlarının çevresel etkilerini azaltır ve karbon salınımını önler.",
      color: "#4CAF50",
      bgColor: "#E8F5E8"
    },
    {
      image: "/images/sustainability/sdg15.webp",
      number: "SDG 15",
      title: "Karasal Yaşam",
      description: "Karasal ekosistemlerin korunması ve sürdürülebilir kullanımı",
      ourContribution: "Orman yangınlarını önleyerek biyoçeşitliliği korur ve ekosistemlerin sürdürülebilirliğini sağlar.",
      color: "#4CAF50",
      bgColor: "#E8F5E8"
    },
    {
      image: "/images/sustainability/sdg16.png",
      number: "SDG 16",
      title: "Barış ve Adalet",
      description: "Barışçıl ve kapsayıcı toplumlar için güçlü kurumlar",
      ourContribution: "Şeffaf veri paylaşımı ve güvenilir ihbar sistemi ile toplumsal güven inşa eder.",
      color: "#9C27B0",
      bgColor: "#E3F2FD"
    }
  ];

  const environmentalImpacts = [
    {
      icon: "🌍",
      title: "Karbon Ayak İzi Azaltma",
      description: "Yangın önleme ile yıllık 50,000 ton CO2 salınımı engellendi",
      impact: "50,000 ton",
      color: "#000000"
    },
    {
      icon: "🌲",
      title: "Orman Koruma",
      description: "Erken tespit ile 1,200 hektar orman alanı korundu",
      impact: "1,200 ha",
      color: "#000000"
    },
    {
      icon: "💧",
      title: "Su Tasarrufu",
      description: "Etkili müdahale ile yangın söndürme suyu tasarrufu sağlandı",
      impact: "2M litre",
      color: "#000000"
    },
    {
      icon: "🐾",
      title: "Yaban Hayatı Koruma",
      description: "Habitat korunması ile 500+ türün yaşam alanı güvende",
      impact: "500+ tür",
      color: "#FF9800"
    }
  ];

  const sustainabilityPrinciples = [
    {
      title: "Çevresel Sorumluluk",
      description: "Doğal kaynakları koruyarak gelecek nesillere yaşanabilir bir çevre bırakıyoruz",
      icon: "🌱"
    },
    {
      title: "Sosyal Fayda",
      description: "Toplumun tüm kesimlerinin güvenliği için eşit erişim sağlıyoruz",
      icon: "👥"
    },
    {
      title: "Ekonomik Sürdürülebilirlik",
      description: "Maliyet-etkin çözümlerle uzun vadeli değer yaratıyoruz",
      icon: "💰"
    },
    {
      title: "Teknolojik İnovasyon",
      description: "Sürekli araştırma-geliştirme ile çevre dostu teknolojiler geliştiriyoruz",
      icon: "🔬"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Container fluid className="py-5" style={{ 
        background:
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 100, 0.7)), url('https://images.unsplash.com/photo-1503437313881-503a91226419') center/cover no-repeat", 
        minHeight: "60vh"
      }}>
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="text-white">
              <div className="mb-4">
                <Badge bg="light" text="primary" className="px-3 py-2 rounded-pill mb-3" style={{ fontSize: '1rem' }}>
                  🌍 Sürdürülebilir Kalkınma
                </Badge>
              </div>
              <h1 className="display-4 fw-bold mb-4">Sürdürülebilirlik Vizyonumuz</h1>
              <h2 className="h3 fw-normal mb-4 text-light">
                Doğayı koruyan <span className="text-warning fw-bold">akıllı teknoloji</span>
              </h2>
              <p className="lead mb-4" style={{ maxWidth: '600px' }}>
                YiSiS, orman ve ev yangınlarını erken tespit ederek ekosistemi ve insan sağlığını korur. 
                Açık kaynak veriler ve kullanıcı dostu arayüzle afet yönetimine yenilikçi bir yaklaşım sunar, 
                güvenli ve sürdürülebilir topluluklar inşa etmeyi hedefler.
              </p>
            </Col>
            <Col lg={4} className="text-center">
              <div className="position-relative">
                <div
                  className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{ width: '200px', height: '200px' }}
                >
                  <div style={{ fontSize: '4rem' }}>🌱</div>
                </div>
                <Row className="text-center mt-4">
                  <Col xs={6}>
                    <div className="text-warning">
                      <h3 className="fw-bold mb-1">5</h3>
                      <small className="text-light">SDG Katkısı</small>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="text-warning">
                      <h3 className="fw-bold mb-1">100+</h3>
                      <small className="text-light">Çevre Dostu Kullanıcı</small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* SDG Katkıları */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={10} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-4">Sürdürülebilir Kalkınma Hedeflerine Katkımız</h2>
            <p className="lead text-muted">
              YiSiS, Birleşmiş Milletler Sürdürülebilir Kalkınma Hedefleri'ne doğrudan katkı sağlar
            </p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {sdgGoals.map((goal, index) => (
            <Col key={index} xl={4} lg={6} md={6} sm={12} className="mb-4 d-flex">
              <Card 
                className="w-100 border-0 position-relative overflow-hidden d-flex flex-column"
                style={{
                  borderRadius: '25px',
                  backgroundColor: goal.bgColor,
                  boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  transition: 'all 0.4s ease',
                  minHeight: '450px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
                }}
              >

                <Card.Body className="p-5 text-center d-flex flex-column justify-content-between position-relative">
                  {/* Üst Kısım - SDG Resmi ve Başlık */}
                  <div className="mb-4">
                    <div className="mb-4">
                      <div
                        className="mx-auto d-flex align-items-center justify-content-center"
                        style={{
                          width: '100px',
                          height: '100px',
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          borderRadius: '25px',
                          padding: '12px',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          border: `3px solid ${goal.color}20`
                        }}
                      >
                        <img 
                          src={goal.image} 
                          alt={goal.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '15px'
                          }}
                        />
                      </div>
                    </div>
                    
                    <Badge 
                      style={{ 
                        backgroundColor: goal.color,
                        fontSize: '0.9rem',
                        padding: '8px 16px'
                      }}
                      className="mb-3"
                    >
                      {goal.number}
                    </Badge>
                    
                    <h4 className="fw-bold mb-3" style={{ color: '#000000', lineHeight: '1.3' }}>
                      {goal.title}
                    </h4>
                    
                    <p className="mb-4" style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: '1.6',
                      fontWeight: '500',
                      color: '#333333'
                    }}>
                      {goal.description}
                    </p>
                  </div>
                  
                  {/* Alt Kısım - Katkımız */}
                  <div 
                    className="p-4 rounded-4 mt-auto"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: `2px solid ${goal.color}15`,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <h6 className="fw-bold mb-3 d-flex align-items-center justify-content-center" 
                        style={{ color: goal.color, fontSize: '1rem' }}>
                      <span className="me-2">🎯</span>
                      Bizim Katkımız
                    </h6>
                    <p className="mb-0" style={{ 
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      color: '#555',
                      fontWeight: '500'
                    }}>
                      {goal.ourContribution}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Çevresel Etki */}
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Çevresel Etkimiz</h2>
              <p className="lead text-muted">
                YiSiS'in çevre üzerindeki olumlu etkileri rakamlarla
              </p>
              <i className="lead text-muted">
                *Veriler temsilidir.
              </i>
            </Col>
          </Row>
          <Row className="g-4">
            {environmentalImpacts.map((impact, index) => (
              <Col key={index} lg={3} md={6}>
                <Card 
                  className="text-center border-0 h-100"
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Card.Body className="p-4">
                    <div
                      className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: `${impact.color}20`,
                        borderRadius: '50%',
                        fontSize: '2rem'
                      }}
                    >
                      {impact.icon}
                    </div>
                    <h3 className="fw-bold mb-2" style={{ color: impact.color }}>
                      {impact.impact}
                    </h3>
                    <h5 className="fw-semibold mb-3">{impact.title}</h5>
                    <p className="text-muted small">{impact.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* Sürdürülebilirlik İlkelerimiz */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-4">Sürdürülebilirlik İlkelerimiz</h2>
            <p className="lead text-muted">
              Çevresel, sosyal ve ekonomik sürdürülebilirlik için temel değerlerimiz
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          {sustainabilityPrinciples.map((principle, index) => (
            <Col key={index} lg={3} md={6}>
              <div 
                className="text-center p-4 h-100"
                style={{
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 100, 0.1))',
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 100, 0.2))';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 100, 0.1))';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="mb-3" style={{ fontSize: '3rem' }}>
                  {principle.icon}
                </div>
                <h5 className="fw-bold mb-3">{principle.title}</h5>
                <p className="text-muted">{principle.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Gelecek Hedefleri */}
      <Container fluid className="py-5" style={{ 
        background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 100, 0.7)), url('https://images.unsplash.com/photo-1503437313881-503a91226419') center/cover no-repeat",
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-white">
              <h2 className="display-5 fw-bold mb-4">2030 Hedeflerimiz</h2>
              <p className="lead mb-4">
                Sürdürülebilir bir gelecek için attığımız somut adımlar
              </p>
              <Row className="g-3">
                <Col md={12}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ fontSize: '1.5rem' }}>🎯</div>
                    <div>
                      <h6 className="fw-bold mb-1">Karbon Nötr Operasyon</h6>
                      <small className="opacity-75">2027 yılına kadar karbon nötr hale gelme</small>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ fontSize: '1.5rem' }}>🌍</div>
                    <div>
                      <h6 className="fw-bold mb-1">Global Yaygınlaşma</h6>
                      <small className="opacity-75">50 ülkede yangın önleme sistemi kurma</small>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ fontSize: '1.5rem' }}>📚</div>
                    <div>
                      <h6 className="fw-bold mb-1">Eğitim ve Farkındalık</h6>
                      <small className="opacity-75">1 milyon kişiye yangın güvenliği eğitimi</small>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ fontSize: '1.5rem' }}>🤝</div>
                    <div>
                      <h6 className="fw-bold mb-1">Ortaklık Ağı</h6>
                      <small className="opacity-75">100+ kurum ve kuruluşla işbirliği</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="text-center">
              <div
                className="bg-white bg-opacity-10 rounded-4 p-5"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🚀</div>
                <h4 className="text-white fw-bold mb-3">Geleceğe Yatırım</h4>
                <p className="text-white opacity-75 mb-4">
                  Sürdürülebilir teknolojilerle daha güvenli bir dünya inşa ediyoruz
                </p>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-warning">
                      <h4 className="fw-bold">%100</h4>
                      <small>Yenilenebilir Enerji</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-warning">
                      <h4 className="fw-bold">0</h4>
                      <small>Atık Üretimi</small>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
