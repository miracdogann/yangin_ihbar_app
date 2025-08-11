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

export default function Statistics() {
  return (
    <Container fluid className="py-5 px-3 bg-light min-vh-100">
      <h2 className="text-center text-primary fw-bold mb-5">
        Yangın İhbar İstatistikleri
      </h2>

      {/* Özet Kartlar */}
      <Row className="g-4 justify-content-center mb-5">
        <Col xs={6} md={3}>
          <Card className="text-center shadow h-100 border-0">
            <Card.Body>
              <Card.Title className="display-6 text-danger fw-bold">
                112
              </Card.Title>
              <Card.Text>Toplam İhbar</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow h-100 border-0">
            <Card.Body>
              <Card.Title className="display-6 text-primary fw-bold">
                78
              </Card.Title>
              <Card.Text>Doğrulanmış Yangın</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow h-100 border-0">
            <Card.Body>
              <Card.Title className="display-6 text-success fw-bold">
                24
              </Card.Title>
              <Card.Text>Kontrol Altında</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow h-100 border-0">
            <Card.Body>
              <Card.Title className="display-6 text-secondary fw-bold">
                10
              </Card.Title>
              <Card.Text>Yanlış Alarm</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Grafikler */}
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow border-0">
            <Card.Body>
              <Card.Title className="text-center text-primary fw-semibold mb-3">
                Aylara Göre Yangın Sayısı
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fires" fill="#003087" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow border-0">
            <Card.Body>
              <Card.Title className="text-center text-primary fw-semibold mb-3">
                Yangın Türlerine Göre Dağılım
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
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
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
