import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaFire, FaCheckCircle, FaBell, FaTimesCircle } from "react-icons/fa";

const barData = [
  { month: "Ocak", fires: 12 },
  { month: "Şubat", fires: 18 },
  { month: "Mart", fires: 9 },
  { month: "Nisan", fires: 14 },
  { month: "Mayıs", fires: 20 },
];

const pieData = [
  { name: "Orman", value: 45 },
  { name: "Ev", value: 25 },
  { name: "İşyeri", value: 15 },
  { name: "Arazi", value: 15 },
];

const COLORS = ["#003087", "#0d6efd", "#00c49f", "#ff8042"];

// Yüzdelik etiket formatlayıcı
const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

// Tooltip özelleştirme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <strong>{label}</strong>
        <br />
        {payload.map((entry, index) => (
          <div key={index} style={{ color: entry.color }}>
            {entry.name}: <strong>{entry.value}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Statistics() {
  const statCards = [
    {
      title: "Toplam İhbar",
      value: 112,
      color: "danger",
      icon: <FaBell size={32} />,
      gradient: "linear-gradient(135deg, #ff4d4f, #ff7875)",
    },
    {
      title: "Doğrulanmış Yangın",
      value: 78,
      color: "primary",
      icon: <FaFire size={32} />,
      gradient: "linear-gradient(135deg, #003087, #0d6efd)",
    },
    {
      title: "Kontrol Altında",
      value: 24,
      color: "success",
      icon: <FaCheckCircle size={32} />,
      gradient: "linear-gradient(135deg, #00c49f, #52c41a)",
    },
    {
      title: "Yanlış Alarm",
      value: 10,
      color: "secondary",
      icon: <FaTimesCircle size={32} />,
      gradient: "linear-gradient(135deg, #bfbfbf, #8c8c8c)",
    },
  ];

  return (
    <Container fluid className="py-5 px-3 bg-light min-vh-100">
      <h2 className="text-center text-primary fw-bold mb-5">
        🔥 Yangın İhbar İstatistikleri
      </h2>

      {/* Özet Kartlar */}
      <Row className="g-4 justify-content-center mb-5">
        {statCards.map((item, idx) => (
          <Col xs={6} md={3} key={idx}>
            <Card
              className="text-center shadow h-100 border-0"
              style={{
                background: item.gradient,
                color: "white",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Body>
                <div className="mb-2">{item.icon}</div>
                <Card.Title className="display-6 fw-bold">
                  {item.value}
                </Card.Title>
                <Card.Text>{item.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Grafikler */}
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow border-0">
            <Card.Body>
              <Card.Title className="text-center text-primary fw-semibold mb-3">
                📅 Aylara Göre Yangın Sayısı
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="fires"
                    radius={[6, 6, 0, 0]}
                    animationDuration={800}
                  >
                    {barData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#colorGradient${index})`}
                      />
                    ))}
                  </Bar>
                  <defs>
                    {barData.map((_, index) => (
                      <linearGradient
                        key={index}
                        id={`colorGradient${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#0d6efd" />
                        <stop offset="100%" stopColor="#003087" />
                      </linearGradient>
                    ))}
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card className="h-100 shadow border-0">
            <Card.Body>
              <Card.Title className="text-center text-primary fw-semibold mb-3">
                📊 Yangın Türlerine Göre Dağılım
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={renderCustomizedLabel}
                    animationDuration={800}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{
                          filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.3))",
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
