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
                🛡️ Gizlilik ve Veri Kullanım Bilgileri
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
                ve Esaslar Hakkında Tebliğ kapsamında veri sorumlusu sıfatıyla [Kurum/Şirket 
                Adı] tarafından hazırlanmıştır.
              </p>

              <p className="mb-4">
                [Kurum/Şirket Adı] olarak [site adresi] ("Site") üzerinden kullanıma sunduğumuz 
                YiSiS – Yangın Bilgilendirme ve Harita Takip Sistemi'nin web sürümünde 
                ("Platform") bazı alanlarda küçük veri dosyaları kullanmaktayız.
              </p>

              <p className="mb-4">
                Bu Gizlilik Politikası ("Politika"), [Kurum/Şirket Adı] tarafından yönetilen Site için 
                geçerli olup veri dosyaları, Politika'da açıklanan şekilde kullanılacaktır.
              </p>

              <p className="mb-5">
                Bu Politika'nın amacı, Site'de kullanılan veri dosyaları aracılığıyla otomatik yollarla elde 
                edilen kişisel verilerin işlenmesine ilişkin olarak, hangi amaçlarla hangi tür dosyaları 
                kullandığımızı ve bu dosyaları nasıl yönetebileceğiniz hakkında sizleri 
                bilgilendirmektir.
              </p>

              <p className="mb-5">
                Zorunlu veri dosyaları haricindeki dosyalar için kullanıcıların açık rızaları alınmakta ve 
                istedikleri zaman rızalarını değiştirebilmelerine imkân sağlanmaktadır.
              </p>

              <p className="mb-4">
                Kullanıcılar, veri yönetim paneli üzerinden Site'de kullanılan dosya çeşitlerini 
                görebilmekte ve zorunlu dosyalar dışında kalan tüm dosyalar için "açık" veya "kapalı" 
                seçenekleri ile tercihlerini belirleyebilmektedirler. Tercihler her zaman değiştirilebilir.
              </p>

              {/* Bölüm 1 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  <FaInfoCircle className="me-2" />
                  1. Veri Dosyası Nedir?
                </h3>
                <p className="mb-3">
                  Veri dosyaları, ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza veya cihazınıza 
                  kaydedilen küçük metin dosyalarıdır. Bu dosyalar, Site'nin çalışması, güvenliğinin 
                  sağlanması ve kullanıcı deneyiminin iyileştirilmesi için kullanılmaktadır.
                </p>
                <p>
                  Bu dosyalar kişisel bilgilerinizi doğrudan içermez; ancak IP adresi, cihaz tanımlayıcıları, 
                  kullanım istatistikleri gibi verilerle ilişkilendirilebilir.
                </p>
              </div>

              {/* Bölüm 2 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  <FaShieldAlt className="me-2" />
                  2. Veri Dosyalarını Kim, Nasıl Gönderir?
                </h3>
                <p>
                  Veri dosyaları, Site'ye erişiminiz sırasında cihazınızdaki tarayıcı ile [Kurum/Şirket Adı]'na 
                  ait sunucular veya iş birliği yaptığımız üçüncü taraf servis sağlayıcılar (örn. harita 
                  sağlayıcıları, analiz hizmetleri) arasında kurulan iletişim vasıtasıyla gönderilir.
                </p>
              </div>

              {/* Bölüm 3 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  <FaCog className="me-2" />
                  3. Veri Dosyası Tipleri
                </h3>
                
                <h5 className="fw-bold mb-3" style={{ color: accentColor }}>Sahipliğine Göre:</h5>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Birinci Taraf Dosyalar:</strong> Doğrudan [Kurum/Şirket Adı] tarafından cihazınıza 
                    yerleştirilen dosyalardır.
                  </li>
                  <li className="mb-2">
                    <strong>Üçüncü Taraf Dosyalar:</strong> Harita hizmetleri (örn. Mapbox, Google Maps) veya 
                    analiz sağlayıcılar gibi üçüncü taraflarca yerleştirilen dosyalardır.
                  </li>
                </ul>

                <h5 className="fw-bold mb-3" style={{ color: accentColor }}>Aktif Olduğu Süreye Göre:</h5>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Oturum Dosyaları:</strong> Tarayıcı kapatılana kadar aktif olan kısa süreli dosyalardır.
                  </li>
                  <li className="mb-2">
                    <strong>Kalıcı Dosyalar:</strong> Belirlenen süre boyunca veya siz silene kadar cihazınızda 
                    saklanmaya devam eden dosyalardır.
                  </li>
                </ul>

                <h5 className="fw-bold mb-3" style={{ color: accentColor }}>Kullanım Amacına Göre:</h5>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Teknik/Zorunlu Dosyalar:</strong> Site'nin temel işlevlerini yerine getirebilmesi için 
                    gereklidir. (Örn. harita katmanlarının yüklenmesi, güvenlik kontrolleri)
                  </li>
                  <li className="mb-2">
                    <strong>Fonksiyonel Dosyalar:</strong> Kullanıcı tercihlerini (örn. harita görünüm modu, dil 
                    seçimi) hatırlamayı sağlar.
                  </li>
                  <li className="mb-2">
                    <strong>Performans/Analiz Dosyaları:</strong> Site kullanım istatistiklerinin anonim olarak 
                    ölçülmesini sağlar.
                  </li>
                  <li className="mb-2">
                    <strong>Üçüncü Taraf Harita Dosyaları:</strong> Harita sağlayıcılarının içerik yükleme, 
                    performans ve güvenlik amacıyla kullandıkları dosyalardır.
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
                    <strong>Teknik/Zorunlu Dosyalar:</strong> Kanun'un 5/2(f) bendi ("meşru menfaat") 
                    kapsamında, Site'nin işletilmesi için zorunlu olduğundan açık rıza gerektirmez.
                  </li>
                  <li className="mb-2">
                    <strong>Fonksiyonel, Analiz ve Üçüncü Taraf Dosyalar:</strong> Kanun'un 5/1 maddesi 
                    kapsamında açık rıza ile işlenir.
                  </li>
                </ul>
              </div>

              {/* Bölüm 5 */}
              <div className="section mb-5">
                <h3 className="fw-bold mb-3" style={{ color: mainColor }}>
                  5. Veri Dosyaları Aracılığıyla İşlenen Kişisel Verilerin Aktarılması
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
                  6. Veri Dosyalarının Yönetimi
                </h3>
                <p className="mb-3">
                  Tarayıcınızın ayarları üzerinden veri dosyalarını tamamen devre dışı bırakabilir veya 
                  silebilirsiniz. Ancak zorunlu dosyaların kapatılması, Site'nin bazı bölümlerinin 
                  çalışmamasına neden olabilir.
                </p>
                <p>
                  Ayrıca, veri yönetim paneli üzerinden dilediğiniz zaman tercihlerinizi 
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
                  <strong>Taleplerinizi yiyissistem@gmail.com üzerinden bize iletebilirsiniz.</strong>
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
