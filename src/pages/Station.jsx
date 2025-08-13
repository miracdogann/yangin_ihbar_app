import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getStations } from "../../api";

export default function Station() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await getStations();
        if (Array.isArray(response.data)) {
          setStations(response.data);
        } else if (Array.isArray(response.data.results)) {
          setStations(response.data.results);
        } else if (Array.isArray(response.data.data)) {
          setStations(response.data.data);
        } else {
          setStations([]);
          setError("API beklenmedik formatta veri döndürdü.");
        }
      } catch (err) {
        setError("İstasyon verileri alınamadı.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  if (loading) {
    return (
      <div className="container my-4">
        <h2 className="text-center">Yükleniyor...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <h1 className="text-center text-danger">Bir hata oluştu</h1>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">🚒 İstasyonlar</h1>
      <div className="row g-4">
        {stations.length === 0 ? (
          <p className="text-center">İstasyon bulunamadı.</p>
        ) : (
          stations.map((station) => (
            <div key={station.id} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ backgroundColor: "#e9ecef", borderRadius: "12px" }}
              >
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold mb-3"
                    style={{ color: "#2c3e50" }}
                  >
                    {station.name}
                  </h5>
                  <p
                    className="card-text mb-2"
                    style={{ color: "#34495e" }}
                  >
                    <strong>Adres:</strong> {station.address}
                  </p>

                  {/* Telefon numarası tıklanınca arama başlatır */}
                  <p className="card-text mb-4" style={{ color: "#34495e" }}>
                    <strong>Telefon:</strong>{" "}
                    <a
                      href={`tel:${station.phone_number}`}
                      className="btn btn-success btn-sm ms-2"
                      style={{ fontWeight: "600", borderRadius: "6px" }}
                    >
                      📞{station.phone_number}
                    </a>
                  </p>

                  <a
                    href={`https://maps.google.com/?q=${station.latitude},${station.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-danger mt-auto align-self-start"
                    style={{
                      borderRadius: "8px",
                      padding: "0.5rem 1rem",
                      fontWeight: "600",
                    }}
                  >
                    📍 Haritada Gör
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

