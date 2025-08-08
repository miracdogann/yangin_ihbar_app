import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const navLinkStyle = {
    fontSize: "16px",
    padding: "4px 8px",
    color: "#ffffff",
    fontWeight: 600,
  };

  return (
    <div style={{ position: "relative", width: "100vw" }}>
      {/* Orta Logo */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <img
          src="/7.png"
          alt="Yisis Logo"
          style={{ width: "90px", height: "auto" }}
        />
      </div>

      {/* Navbar Arkaplanı */}
      <div
        style={{
          backgroundColor: "#0d6efd",
          paddingTop: "10px",
          paddingBottom: "10px",
          width: "100vw",
        }}
      >
        <Navbar
          bg="primary"
          variant="dark"
          expand="lg"
          className="py-0"
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-between"
            style={{
              width: "100%",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            {/* Sol Menü + Logo */}
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <img
                src="/8_transparent.png"
                alt="Sol Logo"
                style={{ width: "48px", height: "48px" }}
              />
              <Nav className="d-flex flex-row" style={{ gap: "88px" }}>
                <Nav.Link
                  as={NavLink}
                  to="/istasyonlar"
                  className={getNavLinkClass}
                  style={navLinkStyle}
                >
                  İstasyonlar
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/haritalar"
                  className={getNavLinkClass}
                  style={navLinkStyle}
                >
                  Haritalar
                </Nav.Link>
              </Nav>
            </div>

            {/* Sağ Menü */}
            <Nav className="d-flex align-items-center" style={{ gap: "88px" }}>
              <Nav.Link
                as={NavLink}
                to="/istatistikler"
                className={getNavLinkClass}
                style={navLinkStyle}
              >
                İstatistikler
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/hakkimizda"
                className={getNavLinkClass}
                style={navLinkStyle}
              >
                Hakkımızda
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/iletisim"
                className={getNavLinkClass}
                style={navLinkStyle}
              >
                İletişim
              </Nav.Link>
            </Nav>
          </div>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
