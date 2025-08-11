import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Sustainability() {
  const sustainabilityCards = [
    {
      icon: "🌱",
      title: "Çevresel Sürdürebilirlik",
      content: "Yangın erken uyarı sistemimiz, ormanların ve doğal alanların korunmasında kritik rol oynar. Erken müdahale ile çevresel zararların minimuma indirilmesini sağlıyoruz."
    },
    {
      icon: "💡",
      title: "Teknolojik İnovasyon",
      content: "Sürekli geliştirdiğimiz akıllı sensör teknolojileri ve yapay zeka destekli analiz sistemleri ile daha verimli ve sürdürülebilir çözümler sunuyoruz."
    },
    {
      icon: "🤝",
      title: "Sosyal Sorumluluk",
      content: "Toplum güvenliğini önceleyerek, gelecek nesillere daha güvenli bir çevre bırakmayı hedefliyoruz. Eğitim programları ile farkındalık yaratıyoruz."
    },
    {
      icon: "♻️",
      title: "Döngüsel Ekonomi",
      content: "Kullandığımız teknolojik ekipmanların geri dönüşümünü sağlıyor, atık miktarını minimize ederek çevre dostu bir yaklaşım benimسiyoruz."
    },
    {
      icon: "📊",
      title: "Veri Optimizasyonu",
      content: "Büyük veri analizi ile yangın risklerini önceden tahmin ederek, önleyici tedbirlerin alınmasını sağlıyor ve kaynak israfını önlüyoruz."
    },
    {
      icon: "🌍",
      title: "Küresel İşbirliği",
      content: "Uluslararası standartlara uygun sistemler geliştirerek, yangın güvenliği alanında küresel sürdürebilirlik hedeflerine katkıda bulunuyoruz."
    }
  ];

  const goals = [
    "2030 yılına kadar karbon ayak izimizi %50 azaltmak",
    "Tüm istasyonlarda yenilenebilir enerji kullanımına geçmek",
    "Yapay zeka ile yangın tahmin doğruluğunu %95'e çıkarmak",
    "Toplumsal farkındalık programlarıyla 1 milyon kişiye ulaşmak"
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      paddingTop: "120px",
      paddingBottom: "50px"
    }}>
      <Container>
        {/* Başlık Bölümü */}
        <Row className="mb-5">
          <Col>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h1 style={{ 
                fontSize: "3.5rem", 
                fontWeight: "bold", 
                color: "#2c3e50",
                marginBottom: "20px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
              }}>
                🌿 Sürdürebilirlik Vizyonumuz
              </h1>
              <p style={{ 
                fontSize: "1.3rem", 
                color: "#7f8c8d", 
                maxWidth: "800px", 
                margin: "0 auto",
                lineHeight: "1.6"
              }}>
                Yangın güvenliği teknolojilerinde sürdürülebilir inovasyonla gelecek nesillere 
                daha güvenli ve yaşanabilir bir dünya bırakıyoruz.
              </p>
            </div>
          </Col>
        </Row>

        {/* Sürdürebilirlik Kartları */}
        <Row className="mb-5">
          {sustainabilityCards.map((card, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card style={{
                height: "100%",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              className="h-100"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}>
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "4rem", 
                    marginBottom: "20px",
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
                  }}>
                    {card.icon}
                  </div>
                  <Card.Title style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: "bold", 
                    color: "#2c3e50",
                    marginBottom: "15px"
                  }}>
                    {card.title}
                  </Card.Title>
                  <Card.Text style={{ 
                    color: "#7f8c8d", 
                    lineHeight: "1.6",
                    fontSize: "1rem"
                  }}>
                    {card.content}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Hedeflerimiz Bölümü */}
        <Row className="mb-5">
          <Col>
            <Card style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "20px",
              color: "white",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
            }}>
              <Card.Body style={{ padding: "50px 40px" }}>
                <h2 style={{ 
                  textAlign: "center", 
                  marginBottom: "40px", 
                  fontSize: "2.5rem",
                  fontWeight: "bold"
                }}>
                  🎯 2030 Sürdürebilirlik Hedeflerimiz
                </h2>
                <Row>
                  {goals.map((goal, index) => (
                    <Col md={6} className="mb-3" key={index}>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center",
                        background: "rgba(255,255,255,0.1)",
                        padding: "20px",
                        borderRadius: "15px",
                        backdropFilter: "blur(10px)"
                      }}>
                        <span style={{ 
                          fontSize: "2rem", 
                          marginRight: "15px",
                          filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
                        }}>
                          ✓
                        </span>
                        <span style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
                          {goal}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* İstatistikler Bölümü */}
        <Row className="mb-5">
          <Col md={3} className="text-center mb-4">
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#27ae60", fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>
                15K+
              </h3>
              <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>Korunan Hektar</p>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#3498db", fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>
                98%
              </h3>
              <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>Doğruluk Oranı</p>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#e74c3c", fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>
                -65%
              </h3>
              <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>Karbon Azaltımı</p>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#f39c12", fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>
                500K+
              </h3>
              <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>Eğitilen Kişi</p>
            </div>
          </Col>
        </Row>

        {/* Son Mesaj */}
        <Row>
          <Col>
            <div style={{
              background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
              color: "white",
              padding: "50px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ 
                fontSize: "2.2rem", 
                marginBottom: "20px", 
                fontWeight: "bold"
              }}>
                🚀 Birlikte Sürdürülebilir Bir Gelecek İnşa Ediyoruz
              </h3>
              <p style={{ 
                fontSize: "1.2rem", 
                lineHeight: "1.6", 
                maxWidth: "700px", 
                margin: "0 auto",
                opacity: "0.9"
              }}>
                Her yangın erken uyarısı, doğayı koruduğumuz ve gelecek nesillere 
                daha temiz bir çevre bıraktığımız anlamına gelir. Teknoloji ile doğayı 
                korumak bizim önceliğimizdir.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
