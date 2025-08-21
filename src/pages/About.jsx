import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
           const teamMembers = [
                                                                                                               {
            name: "Burak Efe Kılıç",
                         role: "Frontend Developer",
            description: "Web Site ve Mobil Uygulama Geliştirme",
            expertise: ["React", "Next.js","Web Arayüz Geliştirici"],
            image: "/images/about/burak.png",
            email: "burakxff@gmail.com",
            linkedin: "https://www.linkedin.com/in/burak-efe-kili%C3%A7-808863230/",
            github: "https://github.com/burakgilic"
          },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {
               name: "Mehmet Kıvrak",
               role: "Frontend Developer",
               description: "",
               expertise: ["JavaScript", "React","Web Arayüz Geliştirici"],
               image: "/images/about/Mehmet.jpg",
               email: "kivr.mehmet@gmail.com",
               linkedin: "https://www.linkedin.com/in/mehmet-k%C4%B1vrak-41b231228/",
               github: "https://github.com/MehmetKivrak0"
             },
                                                                       {
             name: "Miraç Doğan",
             role: "Mobile Developer", 
             description: "Uzman yazılım geliştirici ve sistem mimarı",
            expertise: ["React Native", "Django", "Mobil Uygulama Geliştirme"],
            image: "/images/about/mirac.jpg",
            email: "miracdogan7247@gmail.com",
            linkedin: "https://www.linkedin.com/in/mira%C3%A7-do%C4%9Fan-194086263/",
            github: "https://github.com/miracdogann/"
          },
                                                                         {
              name: "Tolga Yılmaz",
              role: "Mobile Developer",
              description: "Yangın verileri analizi ve modelleme uzmanı",
              expertise: ["React Native", "Django", "Mobil Uygulama Geliştirme"],
              image: "/images/about/tolga.png",
              email: "tolgayasd97@gmail.com",
              linkedin: "https://www.linkedin.com/in/tolga-yilmaz-424b8b2a5/",
              github: "https://github.com/TolgaYlmaz"
            },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {
               name: "Fevzi Bağrıaçık",
               role: "Back-end Developer",
               description: "Web Site ve Mobil Uygulama Geliştirme",
               expertise: ["Node.js", "React Native", "Mobil Uygulama Geliştirme"],
               image: "/images/about/fevzi.jpg",
               email: "fevzi.bagriacik1905@gmail.com",
               linkedin: "https://www.linkedin.com/in/fevzi-ba%C4%9Fr%C4%B1a%C3%A7%C4%B1k-401252248/",
               github: "https://github.com/fevzibagriacik"
             },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {
                name: "Kerem Işık",
                role: "Cyber ​​Security Assistant",
                description: "Yangın verileri analizi ve modelleme uzmanı",
                expertise: ["Siber Güvenlik", "Ağ Güvenliği", "Veri Analizi"],
                image: "/images/about/kerem.jpg",
                email: "keremisik1010@gmail.com",
                linkedin: "https://linkedin.com/in/keremisik",
                github: "https://github.com/keremmisik"
              },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {
                 name: "Doç.Dr. Barış Çukurbaşı",
                 role: "Proje Danışmanı",
                 description: "Yapay zeka ve makine öğrenmesi uzmanı, proje yönetimi ve stratejik planlama konularında deneyimli",
                 expertise: [" "],
                 image: "/images/about/barıs.jpg",
                 email: "bariscukurbasi@gmail.com",
                 linkedin: "https://www.linkedin.com/in/barocraft/"
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
    { number: "1000+", label: "Başarılı İhbar", color: "#FF6B6B" },
    { number: "99.8%", label: "Doğruluk Oranı", color: "#4ECDC4" },
    { number: "24/7", label: "Kesintisiz İzleme", color: "#45B7D1" },
    { number: "5 dk", label: "Ortalama Müdahale Süresi", color: "#FFA726" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Container fluid className="py-5" style={{ 
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
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
                ><img src="/logo.png" alt="YiSiS Logo" style={{ width: '100%', height: '100%',marginLeft: '-10px', objectFit: 'contain' }} />
                </div>
                
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
              <i className="lead text-muted">
                *Veriler temsilidir.
              </i>
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
            
          </Col>
        </Row>
                 <Row className="g-4 mb-4">
           {teamMembers.slice(0, 4).map((member, index) => (
             <Col key={index} lg={3} md={6}>
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
                   {member.expertise.length > 0 && (
                     <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
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
                   )}
                   {/* Sosyal Medya Linkleri */}
                   <div className="d-flex justify-content-center gap-3">
                     <a 
                       href={`mailto:${member.email}`}
                       className="text-decoration-none"
                       title="E-posta Gönder"
                       style={{ color: '#007bff' }}
                     >
                       <i className="fas fa-envelope" style={{ fontSize: '1.2rem' }}></i>
                     </a>
                     <a 
                       href={member.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-decoration-none"
                       title="LinkedIn Profili"
                       style={{ color: '#0077b5' }}
                     >
                       <i className="fab fa-linkedin" style={{ fontSize: '1.2rem' }}></i>
                     </a>
                     {member.github && (
                       <a 
                         href={member.github}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-decoration-none"
                         title="GitHub Profili"
                         style={{ color: '#333' }}
                       >
                         <i className="fab fa-github" style={{ fontSize: '1.2rem' }}></i>
                       </a>
                     )}
                   </div>
                 </Card.Body>
               </Card>
             </Col>
           ))}
         </Row>
         <Row className="g-4 justify-content-center">
           {teamMembers.slice(4, 7).map((member, index) => (
             <Col key={index + 4} lg={4} md={6}>
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
                   {member.expertise.length > 0 && (
                     <div className="d-flex flex-wrap gap-2 justify-content-center mb-3" style={{ 
                       maxWidth: member.name === "Kerem Işık" ? '300px' : 'auto',
                       margin: '0 auto'
                     }}>
                       {member.expertise.map((skill, i) => (
                         <span
                           key={i}
                           className="badge bg-primary bg-opacity-10 text-primary px-3 py-2"
                           style={{ 
                             borderRadius: '15px',
                                                           width: member.name === "Kerem Işık" ? (i === 2 ? '40%' : '40%') : 'auto',
                             textAlign: member.name === "Kerem Işık" ? 'center' : 'left'
                           }}
                         >
                           {skill}
                         </span>
                       ))}
                     </div>
                   )}
                   {/* Sosyal Medya Linkleri */}
                   <div className="d-flex justify-content-center gap-3">
                     <a 
                       href={`mailto:${member.email}`}
                       className="text-decoration-none"
                       title="E-posta Gönder"
                       style={{ color: '#007bff' }}
                     >
                       <i className="fas fa-envelope" style={{ fontSize: '1.2rem' }}></i>
                     </a>
                     <a 
                       href={member.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-decoration-none"
                       title="LinkedIn Profili"
                       style={{ color: '#0077b5' }}
                     >
                       <i className="fab fa-linkedin" style={{ fontSize: '1.2rem' }}></i>
                     </a>
                     {member.github && (
                       <a 
                         href={member.github}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-decoration-none"
                         title="GitHub Profili"
                         style={{ color: '#333' }}
                       >
                         <i className="fab fa-github" style={{ fontSize: '1.2rem' }}></i>
                       </a>
                     )}
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
              YiSiS projesi, Manisa Celal Bayar Üniversitesi Manisa Teknik Bilimler Meslek Yüksekokulu Genişletilmiş Gerçeklik Laboratuvarı'nda (MCBÜ XRLab) geliştirilmektedir.
              </p>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2rem' }}>📍</div>
                  <div>
                    <h6 className="fw-bold mb-1">MCBU, Manisa</h6>
                    <small className="opacity-75">Manisa Teknik Bilimler Meslek Yüksekokulu</small>
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
