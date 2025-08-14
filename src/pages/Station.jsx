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
      <div className="container my-4 text-center">
        <h2>Yükleniyor...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4 text-center">
        <h1 className="text-danger">Bir hata oluştu</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4"> İstasyonlar</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center">
          <thead style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
            <tr>
              <th>İSTASYON ADI</th>
              <th>ADRES / TELEFON</th>
              <th>YOL TARİFİ</th>
            </tr>
          </thead>
          <tbody>
            {stations.length === 0 ? (
              <tr>
                <td colSpan="3">İstasyon bulunamadı.</td>
              </tr>
            ) : (
              stations.map((station) => (
                <tr key={station.id}>
                  <td>{station.name}</td>
                  <td>
                    {station.address}
                    <br />
                    <strong>
                      <a href={`tel:${station.phone_number}`}>{station.phone_number}</a>
                    </strong>
                  </td>
                  <td>
                    <a
                      href={`https://maps.google.com/?q=${station.latitude},${station.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/map.png"
                        alt="Haritada Gör"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
