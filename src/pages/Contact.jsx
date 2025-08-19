import React, { useRef } from "react";
import { Element } from "react-scroll";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sunkmt5", // Service ID
        "template_6kg4sqj", // Template ID
        form.current,
        "tbnjxo2hQ29shjkuB" // Public Key
      )
      .then(
        (result) => {
          toast.success("Mesaj başarıyla gönderildi!", {
            position: "bottom-left",
            autoClose: 4000,
          });
          form.current.reset();
        },
        (error) => {
          toast.error("Bir hata oluştu. Lütfen tekrar deneyin.", {
            position: "bottom-left",
            autoClose: 4000,
          });
          console.error(error.text);
        }
      );
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .contact-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .contact-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          }
          
          .contact-card:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
          }
          
          .contact-card:hover:before {
            left: 100%;
          }
          
          .icon-circle {
            animation: float 6s ease-in-out infinite;
            position: relative;
          }
          
          .icon-circle:hover {
            animation: pulse 0.5s ease-in-out;
          }
          
          .contact-form .form-control {
            border: 2px solid #e9ecef;
            border-radius: 20px;
            padding: 18px 25px;
            font-size: 1rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
          }
          
          .contact-form .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
            transform: translateY(-3px);
            background: white;
          }
          
          .contact-form .form-control:hover {
            border-color: #667eea;
            transform: translateY(-1px);
          }
          
          .send-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 30px;
            padding: 18px 40px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
          }
          
          .send-btn:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            transition: left 0.5s ease;
            z-index: -1;
          }
          
          .send-btn:hover:before {
            left: 0;
          }
          
          .send-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
            color: white;
          }
          
          .hero-bg {
            position: relative;
            overflow: hidden;
          }
          
          .hero-bg:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          
          .floating-shape {
            position: absolute;
            opacity: 0.1;
            animation: float 8s ease-in-out infinite;
          }
          
          .floating-shape:nth-child(2) {
            animation-delay: -2s;
          }
          
          .floating-shape:nth-child(3) {
            animation-delay: -4s;
          }
        `}
      </style>
      
      <Element name="contact">

        {/* İletişim Formu */}
        <Container className="py-5" style={{ paddingTop: "4rem" }}>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3" style={{ 
                  color: "#2d3748",
                  fontSize: "2.5rem"
                }}>
                  💬 Bize Mesaj Gönderin
                </h2>
                <p style={{ 
                  color: "#718096", 
                  fontSize: "1.2rem",
                  maxWidth: "600px",
                  margin: "0 auto"
                }}>
                  Sorularınız, projeleriniz veya acil durumlarınız için bizimle iletişime geçin. 
                  Profesyonel ekibimiz size en kısa sürede dönüş yapacak.
                </p>
              </div>
              
              <Card className="border-0 shadow-lg contact-form" style={{ 
                borderRadius: "35px",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  position: "relative"
                }}>
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    background: "rgba(0,0,0,0.1)",
                    zIndex: "1"
                  }}></div>
                  <div style={{ position: "relative", zIndex: "2" }}>
                    <h3 className="fw-bold mb-3" style={{ 
                      color: "white", 
                      fontSize: "2.2rem",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                    }}>
                      🔥 Yangın Güvenliği Desteği
                    </h3>
                    <p style={{ 
                      color: "white", 
                      opacity: "0.95",
                      fontSize: "1.2rem",
                      marginBottom: "0"
                    }}>
                      Formunu doldur, uzmanlarımız sana ulaşsın
                    </p>
                  </div>
                </div>
                
                <Card.Body className="p-5" style={{ background: "#fafbfc" }}>
                  <form ref={form} onSubmit={sendEmail}>
                    <Row className="g-4">
                      <Col md={6}>
                        <div className="form-floating">
                          <input
                            type="text"
                            name="first_name"
                            placeholder="Adınız"
                            required
                            className="form-control"
                            id="firstName"
                            style={{
                              height: "65px",
                              fontSize: "1.1rem"
                            }}
                          />
                          <label htmlFor="firstName" style={{ 
                            fontWeight: "600", 
                            color: "#6b7280",
                            fontSize: "1rem"
                          }}>👤 Adınız *</label>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-floating">
                          <input
                            type="text"
                            name="last_name"
                            placeholder="Soyadınız"
                            required
                            className="form-control"
                            id="lastName"
                            style={{
                              height: "65px",
                              fontSize: "1.1rem"
                            }}
                          />
                          <label htmlFor="lastName" style={{ 
                            fontWeight: "600", 
                            color: "#6b7280",
                            fontSize: "1rem"
                          }}>👤 Soyadınız *</label>
                        </div>
                      </Col>
                    </Row>
                    
                    <Row className="g-4 mt-1">
                      <Col md={6}>
                        <div className="form-floating">
                          <input
                            type="email"
                            name="user_email"
                            placeholder="E-mail adresiniz"
                            required
                            className="form-control"
                            id="email"
                            style={{
                              height: "65px",
                              fontSize: "1.1rem"
                            }}
                          />
                          <label htmlFor="email" style={{ 
                            fontWeight: "600", 
                            color: "#6b7280",
                            fontSize: "1rem"
                          }}>📧 E-mail Adresiniz *</label>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-floating">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Telefon numaranız"
                            className="form-control"
                            id="phone"
                            style={{
                              height: "65px",
                              fontSize: "1.1rem"
                            }}
                          />
                          <label htmlFor="phone" style={{ 
                            fontWeight: "600", 
                            color: "#6b7280",
                            fontSize: "1rem"
                          }}>📱 Telefon Numaranız</label>
                        </div>
                      </Col>
                    </Row>
                    
                    <div className="mt-4">
                      <div className="form-floating">
                        <textarea
                          name="message"
                          placeholder="Mesajınızı buraya yazın..."
                          required
                          className="form-control"
                          id="message"
                          style={{ 
                            height: "150px",
                            resize: "vertical",
                            fontSize: "1.1rem"
                          }}
                        ></textarea>
                        <label htmlFor="message" style={{ 
                          fontWeight: "600", 
                          color: "#6b7280",
                          fontSize: "1rem"
                        }}>💬 Mesajınız *</label>
                      </div>
                      <small style={{ 
                        color: "#9ca3af", 
                        fontSize: "0.9rem",
                        marginTop: "8px",
                        display: "block"
                      }}>
                        ℹ️ Lütfen ihtiyacınızı detaylı olarak belirtiniz. Bu sayede size daha iyi yardımcı olabiliriz.
                      </small>
                    </div>
                    
                    <div className="text-center mt-5">
                      <button type="submit" className="btn btn-primary btn-lg send-btn">
                        <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>🚀</span>
                        Mesajı Gönder
                      </button>
                    </div>
                    
                    <div className="text-center mt-3">
                      <small style={{ 
                        color: "#9ca3af",
                        fontSize: "0.9rem"
                      }}>
                        🛡️ Kişisel bilgileriniz güvende tutulur ve asla üçüncü kişilerle paylaşılmaz.
                      </small>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Element>
    </>
  );
};

export default Contact;