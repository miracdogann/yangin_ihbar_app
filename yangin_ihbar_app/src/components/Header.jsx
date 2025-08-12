import { Navbar, Nav, Container } from "react-bootstrap";
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
    <div style={{ position: "relative", width: "100%" }}>
      {/* Orta Logo */}
      <div
        style={{
          position: "absolute",
          top: "-70px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <NavLink to="/">
          <img
            src="/7.png"
            alt="Yisis Logo"
            style={{ width: "240px", height: "auto" }}
          />
        </NavLink>
      </div>

      {/* Navbar */}
      <div
        style={{
          backgroundColor: "#0000FF",
          paddingTop: "10px",
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        <Navbar
          variant="dark"
          expand="lg"
          className="py-0"
          style={{ width: "100%", backgroundColor: "#0000FF" }}
        >
          <Container fluid className="px-3">
            {/* Sol Logo ve Toggle */}
            <Navbar.Toggle aria-controls="main-navbar" />
            <div className="d-flex align-items-center ms-2">
              <NavLink to="/">
                <img
                  src="/9.png"
                  alt="Sol Logo"
                  style={{ width: "100px", height: "100px" }}
                />
              </NavLink>
            </div>

            <Navbar.Collapse id="main-navbar">
              <div className="w-100 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mt-3 mt-lg-0 gap-4">
                {/* Sol Menü */}
                <Nav className="d-flex flex-column flex-lg-row gap-4 gap-lg-5">
                  <Nav.Link
                    as={NavLink}
                    to="/Statistics"
                    className={getNavLinkClass}
                    style={navLinkStyle}
                  >
                    İstatistikler
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/Station"
                    className={getNavLinkClass}
                    style={navLinkStyle}
                  >
                    İstasyonlar
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/Map"
                    className={getNavLinkClass}
                    style={navLinkStyle}
                  >
                    Haritalar
                  </Nav.Link>
                </Nav>

                {/* Sağ Menü */}
                <Nav className="d-flex flex-column flex-lg-row gap-4 gap-lg-5">
                  <Nav.Link
                    as={NavLink}
                    to="/Sustainability"
                    className={getNavLinkClass}
                    style={navLinkStyle}
                  >
                    Sürdürebilirlik
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/About"
                    className={getNavLinkClass}
                    style={navLinkStyle}
                  >
                    Hakkımızda
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/Contact"
                    className={getNavLinkClass}
                    style={navLinkStyle}
                  >
                    İletişim
                  </Nav.Link>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
