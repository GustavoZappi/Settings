import React from "react";
import { Typography, Layout } from "antd";
import MetricsOverview from "./settings/MetricsOverview";
import ClassificationTable from "./settings/ClassificationTable";

const { Content } = Layout;
const { Title } = Typography;

interface HomeProps {
  pageTitle?: string;
}

const Home = ({ pageTitle = "Settings Dashboard" }: HomeProps) => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Header Section */}
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              {pageTitle}
            </Title>
          </div>

          {/* Metrics Overview Section */}
          <MetricsOverview />

          {/* Classification Table Section */}
          <ClassificationTable />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
