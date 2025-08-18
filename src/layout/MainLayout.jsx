import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DataConsent from "../components/DataConsent";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

export default function MainLayout() {
  const navigate = useNavigate();

  // Geliştirme modunda popup'ı gizlemek için bu değeri true yapın
  const isDevelopment = false; // Bu değeri true yaparak popup'ı tamamen gizleyebilirsiniz

  const handleDataAccept = () => {
    // Veri kullanımı kabul edildi
  };

  const handleShowPrivacyPolicy = () => {
    navigate("/privacy-info");
  };

  return (
    <>
      <Header />

      <Outlet />

      <Footer />

      {/* Veri Kullanım Onayı - Tüm sayfalarda gösterilir */}
      {!isDevelopment && (
        <DataConsent 
          onAccept={handleDataAccept}
          onShowPolicy={handleShowPrivacyPolicy}
        />
      )}
    </>
  );
}
