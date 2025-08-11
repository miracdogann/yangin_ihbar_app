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
          background: "#0000FF",
          color: "#fff",
          padding: "5px 0", // padding küçültüldü
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px", // gap küçültüldü
            flexWrap: "wrap",
            marginBottom: "5px",
          }}
        >
          <img
            src="/9.png"
            alt="Logo"
            style={{
              height: "40px", // yükseklik küçültüldü
              width: "auto",
              objectFit: "contain",
            }}
          />
          <img
            src="/7.png"
            alt="YISIS Logo"
            style={{
              height: "50px", // yükseklik küçültüldü
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

        <div style={{ fontSize: "10px", marginBottom: "5px" }}>
          © 2025 XR Lab Yazılım A.Ş. Tüm hakları saklıdır.
        </div>

        <div style={{ marginTop: "3px", fontSize: "10px" }}>
          <a href="#" style={{ color: "#fff", margin: "0 3px" }}>facebook</a>
          <a href="#" style={{ color: "#fff", margin: "0 3px" }}>X</a>
          <a href="#" style={{ color: "#fff", margin: "0 3px" }}>instagram</a>
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
        © {new Date().getFullYear()} YISIS SYSTEM. All rights reserved.
      </div>
    </div>
  );
}
