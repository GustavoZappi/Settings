import React from "react";
import { Card, Row, Col, Typography, Statistic } from "antd";
import {
  BarChartOutlined,
  PieChartOutlined,
  BoxPlotOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface MetricsOverviewProps {
  totalUrls?: number;
  saasPercentage?: number;
  riskLevels?: { high: number; medium: number; low: number };
  appTypes?: { internal: number; external: number; unknown: number };
}

const MetricsOverview = ({
  totalUrls = 1250,
  saasPercentage = 65,
  riskLevels = { high: 15, medium: 45, low: 40 },
  appTypes = { internal: 30, external: 60, unknown: 10 },
}: MetricsOverviewProps) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Metrics Overview
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total URLs"
              value={totalUrls}
              prefix={<BoxPlotOutlined />}
              suffix="URLs"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="SaaS URL %"
              value={saasPercentage}
              prefix={<PieChartOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Risk Level Distribution"
              value={riskLevels.high}
              prefix={<BarChartOutlined />}
              suffix="% High Risk"
            />
            <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 4 }}>
              {riskLevels.medium}% Medium, {riskLevels.low}% Low Risk
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Application Types"
              value={appTypes.external}
              prefix={<AppstoreOutlined />}
              suffix="% External"
            />
            <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 4 }}>
              {appTypes.internal}% Internal, {appTypes.unknown}% Unknown
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MetricsOverview;
