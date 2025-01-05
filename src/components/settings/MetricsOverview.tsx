import React from "react";
import { Card, Row, Col, Typography, Statistic } from "antd";
import {
  BarChartOutlined,
  AppstoreOutlined,
  BoxPlotOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface MetricsOverviewProps {
  totalUrls?: number;
  saasQuantity?: number;
  riskLevels?: { high: number; medium: number; low: number };
  configuredSaasPercentage?: number;
}

const MetricsOverview = ({
  totalUrls = 1250,
  saasQuantity = 815,
  riskLevels = { high: 15, medium: 45, low: 40 },
  configuredSaasPercentage = 78,
}: MetricsOverviewProps) => {
  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  };

  const statisticStyle = {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    justifyContent: "center",
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Metrics Overview
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle}>
            <Statistic
              title="Total URLs"
              value={totalUrls}
              prefix={<BoxPlotOutlined />}
              suffix="URLs"
              style={statisticStyle}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle}>
            <Statistic
              title="SaaS Discovered"
              value={saasQuantity}
              prefix={<AppstoreOutlined />}
              suffix="Apps"
              style={statisticStyle}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle}>
            <Statistic
              title="Configured SaaS"
              value={configuredSaasPercentage}
              prefix={<CheckCircleOutlined />}
              suffix="%"
              style={statisticStyle}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle}>
            <div style={statisticStyle}>
              <Statistic
                title="Risk Level Distribution"
                value={riskLevels.high}
                prefix={<BarChartOutlined />}
                suffix="% High Risk"
              />
              <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 4 }}>
                {riskLevels.medium}% Medium, {riskLevels.low}% Low Risk
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MetricsOverview;
