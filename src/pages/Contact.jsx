import React, { useRef, useState } from "react";
import { Element } from "react-scroll";
import { Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ad soyad için sadece harf ve boşluk kabul et
  const handleNameInput = (e, fieldName) => {
    const value = e.target.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, "");
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    // Hata mesajını temizle
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  // Telefon için sadece sayı kabul et ve maksimum 11 hane
  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setFormData({
      ...formData,
      phone: value,
    });

    // Hata mesajını temizle
    if (errors.phone) {
      setErrors({
        ...errors,
        phone: "",
      });
    }
  };

  // Diğer inputlar için genel handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Form gönderim validasyonu
  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Ad alanı zorunludur";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "Ad en az 2 karakter olmalıdır";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Soyad alanı zorunludur";
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = "Soyad en az 2 karakter olmalıdır";
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = "E-posta alanı zorunludur";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Geçerli bir e-posta adresi giriniz";
    }

    if (formData.phone && formData.phone.length !== 11) {
      newErrors.phone = "Telefon numarası 11 haneli olmalıdır (5XX XXX XX XX)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj alanı zorunludur";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!validateForm()) {
    toast.error("Lütfen formdaki hataları düzeltin.", {
      position: "bottom-left",
      autoClose: 4000,
    });
    setIsSubmitting(false);
    return;
  }

  // Ad ve soyadı birleştir
  const fullName = `${formData.first_name} ${formData.last_name}`;
  
  // Forma gizli bir input ekleyerek full_name'i gönder
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "full_name";
  hiddenInput.value = fullName;
  form.current.appendChild(hiddenInput);

  emailjs
    .sendForm(
      "service_sunkmt5",
      "template_6kg4sqj",
      form.current,
      "tbnjxo2hQ29shjkuB"
    )
    .then(
      (result) => {
        // Gönderim başarılı olduğunda gizli input'u temizle
        form.current.removeChild(hiddenInput);
        
        // Toast bildirimi
        toast.success("✅ Mesajınız başarıyla gönderildi!", {
          position: "bottom-left",
          autoClose: 3000,
        });

        // Sol alt köşede bildirim göster
        setShowSuccessAlert(true);

        // Formu sıfırla
        form.current.reset();
        setFormData({
          first_name: "",
          last_name: "",
          user_email: "",
          phone: "",
          message: "",
        });

        // 5 saniye sonra bildirimi gizle
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);

        setIsSubmitting(false);
      },
      (error) => {
        // Hata durumunda da gizli input'u temizle
        form.current.removeChild(hiddenInput);
        
        toast.error("❌ Bir hata oluştu. Lütfen tekrar deneyin.", {
          position: "bottom-left",
          autoClose: 4000,
        });
        console.error(error.text);
        setIsSubmitting(false);
      }
    );
};

  return (
    <>
      <style>
        {`
          .contact-form .form-control {
            border: 2px solid #e9ecef;
            border-radius: 20px;
            padding: 18px 25px;
            font-size: 1rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(255,255,255,0.9);
          }
          
          .contact-form .form-control:focus {
            border-color: #1976d2;
            box-shadow: 0 0 0 0.25rem rgba(25, 118, 210, 0.25);
            transform: translateY(-3px);
            background: white;
          }
          
          .contact-form .form-control:hover {
            border-color: #1976d2;
            transform: translateY(-1px);
          }
          
          .contact-form .is-invalid {
            border-color: #dc3545 !important;
          }
          
          .contact-form .is-invalid:focus {
            box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
          }
          
          .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
          
          .send-btn {
            background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
            border: none;
            border-radius: 30px;
            padding: 18px 40px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.4s ease;
            position: relative;
            min-width: 180px;
          }
          
          .send-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(25, 118, 210, 0.4);
            color: white;
          }
          
          .send-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .success-alert {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1060;
            border-radius: 15px;
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            color: white;
            max-width: 400px;
            animation: slideInLeft 0.5s ease-out;
          }
          
          @keyframes slideInLeft {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .alert-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            line-height: 1;
            padding: 0;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s;
          }
          
          .alert-close-btn:hover {
            opacity: 1;
          }
        `}
      </style>

      <Element name="contact">
        <Container className="py-5 bg-light">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card
                className="border-0 shadow-lg contact-form"
                style={{
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 100, 0.7)), url('https://images.unsplash.com/photo-1503437313881-503a91226419') center/cover no-repeat",
                    padding: "3rem 2rem",
                    textAlign: "center",
                    position: "relative",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      bottom: "0",
                      background: "rgba(0,0,0,0.1)",
                      zIndex: "1",
                    }}
                  ></div>
                  <div style={{ position: "relative", zIndex: "2" }}>
                    <h3
                      className="fw-bold mb-3"
                      style={{
                        color: "white",
                        fontSize: "2.2rem",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      🔥 Yangın Güvenliği Desteği
                    </h3>
                    <p
                      style={{
                        color: "white",
                        opacity: "0.95",
                        fontSize: "1.2rem",
                        marginBottom: "0",
                      }}
                    >
                      Formunu doldur, uzmanlarımız sana ulaşsın
                    </p>
                  </div>
                </div>

                <Card.Body className="p-5" style={{ background: "#f8f9fa" }}>
                  <Form ref={form} onSubmit={sendEmail}>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            👤 Adınız *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={(e) => handleNameInput(e, "first_name")}
                            required
                            className={errors.first_name ? "is-invalid" : ""}
                            style={{
                              height: "60px",
                              fontSize: "1.1rem",
                            }}
                            placeholder="Adınız"
                          />
                          {errors.first_name && (
                            <div className="error-message">
                              {errors.first_name}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            👤 Soyadınız *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={(e) => handleNameInput(e, "last_name")}
                            required
                            className={errors.last_name ? "is-invalid" : ""}
                            style={{
                              height: "60px",
                              fontSize: "1.1rem",
                            }}
                            placeholder="Soyadınız"
                          />
                          {errors.last_name && (
                            <div className="error-message">
                              {errors.last_name}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="g-4 mt-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            📧 E-mail Adresiniz *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleInputChange}
                            required
                            className={errors.user_email ? "is-invalid" : ""}
                            style={{
                              height: "60px",
                              fontSize: "1.1rem",
                            }}
                            placeholder="ornek@email.com"
                          />
                          {errors.user_email && (
                            <div className="error-message">
                              {errors.user_email}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            📱 Telefon Numaranız
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneInput}
                            className={errors.phone ? "is-invalid" : ""}
                            style={{
                              height: "60px",
                              fontSize: "1.1rem",
                            }}
                            placeholder="5XX XXX XX XX"
                            maxLength="11"
                          />
                          {errors.phone && (
                            <div className="error-message">{errors.phone}</div>
                          )}
                          <Form.Text className="text-muted">
                            {formData.phone.length}/11 karakter
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          💬 Mesajınız *
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className={errors.message ? "is-invalid" : ""}
                          style={{
                            height: "150px",
                            resize: "vertical",
                            fontSize: "1.1rem",
                          }}
                          placeholder="Mesajınızı buraya yazın..."
                        />
                        {errors.message && (
                          <div className="error-message">{errors.message}</div>
                        )}
                        <Form.Text className="text-muted">
                          ℹ Lütfen ihtiyacınızı detaylı olarak belirtiniz. Bu
                          sayede size daha iyi yardımcı olabiliriz.
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="text-center mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg send-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading-spinner me-2"></span>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                marginRight: "10px",
                                fontSize: "1.2rem",
                              }}
                            >
                              🚀
                            </span>
                            Mesajı Gönder
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <small className="text-muted">
                        🛡 Kişisel bilgileriniz güvende tutulur ve asla üçüncü
                        kişilerle paylaşılmaz.
                      </small>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Sol Alt Köşede Başarılı Gönderim Bildirimi */}
        {showSuccessAlert && (
          <Alert variant="success" className="success-alert">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center">
                  <span className="fs-4 me-3">✅</span>
                  <div>
                    <h6 className="alert-heading mb-1">
                      Mesajınız Gönderildi!
                    </h6>
                    <p className="mb-0 small">
                      En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="alert-close-btn"
                onClick={() => setShowSuccessAlert(false)}
              >
                ×
              </button>
            </div>
          </Alert>
        )}
      </Element>
    </>
  );
};

export default Contact;