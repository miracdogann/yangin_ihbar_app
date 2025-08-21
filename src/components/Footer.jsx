import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* MAVİ KISIM */}
      <div
        style={{
          background: "#000000",
          color: "#fff",
          padding: "5px 0",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "5px",
          }}
        >
          <img
            src="9.png"
            alt="Logo"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <img
            src="/7.png"
            alt="YISIS Logo"
            style={{
              height: "50px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        <div style={{ margin: "5px 0", fontSize: "12px" }}>
          <Link to="/" style={{ color: "#fff", margin: "0 5px", textDecoration: "none" }}>Ana Sayfa</Link>
          <Link to="/station" style={{ color: "#fff", margin: "0 5px", textDecoration: "none" }}>İstasyonlar</Link>
          <Link to="/statistics" style={{ color: "#fff", margin: "0 5px", textDecoration: "none" }}>İstatistikler</Link>
          <Link to="/map" style={{ color: "#fff", margin: "0 5px", textDecoration: "none" }}>Harita</Link>
          <Link to="/about" style={{ color: "#fff", margin: "0 5px", textDecoration: "none" }}>Hakkımızda</Link>
          <Link to="/contact" style={{ color: "#fff", margin: "0 5px", textDecoration: "none" }}>İletişim</Link>
        </div>

                <div style={{ fontSize: "15px", marginBottom: "10px" }}>
          © 2025 XRLab Tüm hakları saklıdır.
        </div>

        <div style={{ marginTop: "3px", fontSize: "15px" }}>
          <a 
            href="https://www.linkedin.com/company/xrlabmcbu/posts/?feedView=all" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: "#fff", margin: "0 5px" }}
          >
            Linkedin
          </a>
          <a 
            href="https://www.instagram.com/xrlab.mcbu/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: "#fff", margin: "0 5px" }}
          >
            Instagram
          </a>
        </div>
        
        {/* Proje Tanıtım Butonu */}
        <div className="text-center mt-3">
          <a 
            href="https://github.com/xrlabmcbu/yisis-project" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light btn-lg px-4 py-2"
            style={{
              borderRadius: '25px',
              border: '2px solid #fff',
              fontWeight: '400',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#000';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
                         <i className="fas fa-info-circle" style={{ fontSize: '18px' }}></i>
            Proje Tanıtım Sayfası
          </a>
        </div>
      </div>

      <div
        style={{
          background: "#000",
          color: "#ccc",
          textAlign: "center",
          fontSize: "10px",
          padding: "2px 5px",
        }}
      >
        © {new Date().getFullYear()} XRLab. All rights reserved.
      </div>
    </div>
  );
}