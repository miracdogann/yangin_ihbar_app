import { Link } from "react-router";

export default function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* MAVİ KISIM */}
      <div
        style={{
          background: "#003087",
          color: "#fff",
          padding: "10px 0",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginBottom: "5px",
          }}
        >
          <img
            src="logo.png"
            alt="Logo"
            style={{
              height: "80px",
              maxHeight: "60px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <img
            src="/7.png"
            alt="YISIS Logo"
            style={{
              height: "150px",
              maxHeight: "100px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <Link
            to="/"
            style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}
          >
            Ana Sayfa
          </Link>
          <Link
            to="/station"
            style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}
          >
            İstasyonlar
          </Link>
          <Link
            to="/statistics"
            style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}
          >
            İstatistikler
          </Link>
          <Link
            to="/map"
            style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}
          >
            Harita
          </Link>
          <Link
            to="/about"
            style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}
          >
            Hakkımızda
          </Link>
          <Link
            to="/contact"
            style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}
          >
            İletişim
          </Link>
        </div>

        <div style={{ fontSize: "12px", marginBottom: "10px" }}>
          © 2025 XR Lab Yazılım A.Ş. Tüm hakları saklıdır.
        </div>

        <div style={{ marginTop: "5px" }}>
          <a href="#" style={{ color: "#fff", margin: "0 5px" }}>
            <i>facebook</i>
          </a>
          <a href="#" style={{ color: "#fff", margin: "0 5px" }}>
            <i>X</i>
          </a>
          <a href="#" style={{ color: "#fff", margin: "0 5px" }}>
            <i>instagram</i>
          </a>
        </div>
      </div>

      <div
        style={{
          background: "#000",
          color: "#ccc",
          textAlign: "center",
          fontSize: "11px",
          padding: "4px 10px",
        }}
      >
        © {new Date().getFullYear()} YISIS SYSTEM. All rights reserved.
      </div>
    </div>
  );
}
