import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaArrowLeft, FaInfoCircle, FaShieldAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router";

const PrivacyInfo = () => {
  const navigate = useNavigate();
  const mainColor = "#0000ff";
  const accentColor = "#ff9800";

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "20px" }}>
      <Container>
        {/* Header */}
        <div className="mb-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate(-1)}
            className="mb-3"
            style={{ borderColor: mainColor, color: mainColor }}
          >
            <FaArrowLeft className="me-2" />
            Geri Dön
          </Button>
          
          <Card className="shadow border-0" style={{ borderRadius: "15px" }}>
            <Card.Body className="p-4 text-center">
              <FaInfoCircle size={50} style={{ color: accentColor }} className="mb-3" />
              <h1 className="fw-bold" style={{ color: mainColor }}>
                🛡️ Çerez Politikası
              </h1>
              <p className="text-muted">
                YiSiS - Yangın Bilgilendirme ve Harita Takip Sistemi
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* İçerik */}
        <Card className="shadow border-0 mb-4" style={{ borderRadius: "15px" }}>
          <Card.Body className="p-5">
            <div className="content-section">
              <p className="mb-4">
                Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("Kanun")'un 10. 
                maddesi ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul 
                ve Esaslar Hakkında Tebliğ kapsamında veri sorumlusu sıfatıyla Yisis tarafından 
                hazırlanmıştır.
              </p>

              <p className="mb-4">
                Yisis olarak yisisxrlab.com ("Site") üzerinden kullanıma sunduğumuz YiSiS – 
                Yangın Bilgilendirme ve Harita Takip Sistemi'nin web sürümünde ("Platform") bazı 
                alanlarda çerezler kullanmaktayız.
              </p>

              <p className="mb-4">
                Bu Çerez Politikası ("Politika"), Yisis tarafından yönetilen Site için geçerli olup 
                çerezler, Politika'da açıklanan şekilde kullanılacaktır.
              </p>

              <p className="mb-5">
                Bu Politika'nın amacı, Site'de kullanılan çerezler aracılığıyla otomatik yollarla elde 
                edilen kişisel verilerin işlenmesine ilişkin olarak, hangi amaçlarla hangi tür çerezleri 
                kullandığımızı ve bu çerezleri nasıl yönetebileceğiniz hakkında sizleri 
                bilgilendirmektir.
              </p>

              <p className="mb-5">
                Zorunlu çerezler haricindeki çerezler için kullanıcıların açık rızaları alınmakta ve 
                istedikleri zaman rızalarını değiştirebilmelerine imkân sağlanmaktadır.
              </p>

              <p className="mb-4">
                Kullanıcılar, çerez yönetim paneli üzerinden Site'de kullanılan çerez çeşitlerini 
                görebilmekte ve zorunlu çerezler dışında kalan tüm çerezler için "açık" veya "kapalı" 
                seçenekleri ile tercihlerini belirleyebilmektedirler. Tercihler her zaman değiştirilebilir.
              </p>

              {/* Bölüm 1 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  <FaInfoCircle className="me-2" />
                  1. Çerez Nedir?
                </h3>
                <p className="mb-3">
                  Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza veya cihazınıza 
                  kaydedilen küçük metin dosyalarıdır. Çerezler, Site'nin çalışması, güvenliğinin 
                  sağlanması ve kullanıcı deneyiminin iyileştirilmesi için kullanılmaktadır.
                </p>
                <p>
                  Çerezler kişisel bilgilerinizi doğrudan içermez; ancak IP adresi, cihaz tanımlayıcıları, 
                  kullanım istatistikleri gibi verilerle ilişkilendirilebilir.
                </p>
              </div>

              {/* Bölüm 2 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  <FaShieldAlt className="me-2" />
                  2. Çerezleri Kim, Nasıl Gönderir?
                </h3>
                <p>
                  Çerezler, Site'ye erişiminiz sırasında cihazınızdaki tarayıcı ile Yisis'e ait sunucular 
                  veya iş birliği yaptığımız üçüncü taraf servis sağlayıcılar (örn. harita sağlayıcıları, 
                  analiz hizmetleri) arasında kurulan iletişim vasıtasıyla gönderilir.
                </p>
              </div>

              {/* Bölüm 3 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  <FaCog className="me-2" />
                  3. Çerez Tipleri
                </h3>
                
                <h5 className="fw-bold mb-3" style={{ color: accentColor }}>Sahipliğine Göre:</h5>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Birinci Taraf Çerezler:</strong> Doğrudan Yisis tarafından cihazınıza 
                    yerleştirilen çerezlerdir.
                  </li>
                  <li className="mb-2">
                    <strong>Üçüncü Taraf Çerezler:</strong> Harita hizmetleri (örn. Mapbox, Google Maps) veya 
                    analiz sağlayıcılar gibi üçüncü taraflarca yerleştirilen çerezlerdir.
                  </li>
                </ul>

                <h5 className="fw-bold mb-3" style={{ color: accentColor }}>Aktif Olduğu Süreye Göre:</h5>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Oturum Çerezleri:</strong> Tarayıcı kapatılana kadar aktif olan kısa süreli çerezlerdir.
                  </li>
                  <li className="mb-2">
                    <strong>Kalıcı Çerezler:</strong> Belirlenen süre boyunca veya siz silene kadar cihazınızda 
                    saklanmaya devam eden çerezlerdir.
                  </li>
                </ul>

                <h5 className="fw-bold mb-3" style={{ color: accentColor }}>Kullanım Amacına Göre:</h5>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Teknik/Zorunlu Çerezler:</strong> Site'nin temel işlevlerini yerine getirebilmesi için 
                    gereklidir. (Örn. harita katmanlarının yüklenmesi, güvenlik kontrolleri)
                  </li>
                  <li className="mb-2">
                    <strong>Fonksiyonel Çerezler:</strong> Kullanıcı tercihlerini (örn. harita görünüm modu, dil 
                    seçimi) hatırlamayı sağlar.
                  </li>
                  <li className="mb-2">
                    <strong>Performans/Analiz Çerezleri:</strong> Site kullanım istatistiklerinin anonim olarak 
                    ölçülmesini sağlar.
                  </li>
                  <li className="mb-2">
                    <strong>Üçüncü Taraf Harita Çerezleri:</strong> Harita sağlayıcılarının içerik yükleme, 
                    performans ve güvenlik amacıyla kullandıkları çerezlerdir.
                  </li>
                </ul>
              </div>

              {/* Bölüm 4 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  4. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepler
                </h3>
                <ul>
                  <li className="mb-2">
                    <strong>Teknik/Zorunlu Çerezler:</strong> Kanun'un 5/2(f) bendi ("meşru menfaat") 
                    kapsamında, Site'nin işletilmesi için zorunlu olduğundan açık rıza gerektirmez.
                  </li>
                  <li className="mb-2">
                    <strong>Fonksiyonel, Analiz ve Üçüncü Taraf Çerezler:</strong> Kanun'un 5/1 maddesi 
                    kapsamında açık rıza ile işlenir.
                  </li>
                </ul>
              </div>

              {/* Bölüm 5 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  5. Çerezler Aracılığıyla İşlenen Kişisel Verilerin Aktarılması
                </h3>
                <ul>
                  <li className="mb-2">
                    Harita hizmetleri (örn. Google Maps, Mapbox) aracılığıyla veriler yurt 
                    dışındaki sunuculara aktarılabilir.
                  </li>
                  <li className="mb-2">
                    Analiz servisleri (örn. Google Analytics) ile yalnızca açık rıza verilmesi 
                    durumunda veriler işlenir ve yurt dışına aktarılabilir.
                  </li>
                  <li className="mb-2">
                    Tüm aktarımlar KVKK'nın 9. maddesine uygun şekilde ve gerekli teknik/idari 
                    tedbirler alınarak yapılır.
                  </li>
                </ul>
              </div>

              {/* Bölüm 6 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  6. Çerezlerin Yönetimi
                </h3>
                <p className="mb-3">
                  Tarayıcınızın ayarları üzerinden çerezleri tamamen devre dışı bırakabilir veya 
                  silebilirsiniz. Ancak zorunlu çerezlerin kapatılması, Site'nin bazı bölümlerinin 
                  çalışmamasına neden olabilir.
                </p>
                <p>
                  Ayrıca, çerez yönetim paneli üzerinden dilediğiniz zaman tercihlerinizi 
                  değiştirebilirsiniz.
                </p>
              </div>

              {/* Bölüm 7 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  7. KVKK Kapsamındaki Haklarınız
                </h3>
                <p className="mb-3">Kanun'un 11. maddesi uyarınca;</p>
                <ul>
                  <li className="mb-2">Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                  <li className="mb-2">İşlenmişse buna ilişkin bilgi talep etme,</li>
                  <li className="mb-2">Amacına uygun işlenip işlenmediğini öğrenme,</li>
                  <li className="mb-2">Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                  <li className="mb-2">Eksik/yanlış işlenmişse düzeltilmesini isteme,</li>
                  <li className="mb-2">Silinmesini veya yok edilmesini talep etme,</li>
                  <li className="mb-2">İşlemenin hukuka aykırı olması hâlinde zararın giderilmesini talep etme</li>
                </ul>
                <p>haklarına sahipsiniz.</p>
                <p className="mt-3">
                  <strong>Taleplerinizi yisisdestek@gmail.com üzerinden bize iletebilirsiniz.</strong>
                </p>
              </div>

              {/* Bölüm 8 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  8. Güncellemeler
                </h3>
                <p className="mb-3">
                  Bu Politika, ihtiyaç halinde güncellenebilir. En güncel sürüm Site'de yayımlanır.
                </p>
                <p className="fw-bold" style={{ color: accentColor }}>
                  Yürürlük Tarihi / Son Güncelleme: 13.08.2025
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Footer Button */}
        <div className="text-center mb-5">
          <Button
            size="lg"
            className="fw-bold px-4"
            style={{
              backgroundColor: mainColor,
              borderColor: mainColor,
              borderRadius: "25px"
            }}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Ana Sayfaya Dön
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyInfo;
