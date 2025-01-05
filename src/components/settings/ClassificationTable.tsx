import React, { useState } from "react";
import { Table, Input, Button, Tag, Modal } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import RuleConfigurationModal from "./RuleConfigurationModal";
import type { ColumnsType } from "antd/es/table";

type ProductivityRule = {
  productivityLevel: "Productive" | "Non-Productive" | "Neutral";
  scope: "Organization" | "Sector" | "Department" | "Cost Center";
  scopeValue?: string;
};

interface DataType {
  id: string;
  url: string;
  accessCount: number;
  isSaas: boolean;
  productivityRules: ProductivityRule[];
  approvalStatus: "Sanctioned" | "Unsanctioned" | "Under Analysis";
  riskLevel: "High" | "Medium" | "Low";
  appType:
    | "Productivity"
    | "CRM"
    | "ERP"
    | "Search Engine"
    | "Social Media"
    | "Messaging and Communication"
    | "Entertainment"
    | "Education"
    | "Health and Fitness"
    | "Finance"
    | "Shopping"
    | "Games"
    | "Navigation and Maps"
    | "Photography and Video";
  managementType: "IT Managed Apps" | "Non-IT Managed" | "Employee Purchases";
}

const defaultData: DataType[] = [
  {
    id: "1",
    url: "google.com",
    accessCount: 55878,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "Search Engine",
    managementType: "IT Managed Apps",
  },
  {
    id: "2",
    url: "facebook.com",
    accessCount: 34521,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Non-Productive",
        scope: "Organization",
      },
      {
        productivityLevel: "Productive",
        scope: "Sector",
        scopeValue: "Marketing",
      },
    ],
    approvalStatus: "Under Analysis",
    riskLevel: "Medium",
    appType: "Social Media",
    managementType: "Non-IT Managed",
  },
  {
    id: "3",
    url: "salesforce.com",
    accessCount: 28456,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "CRM",
    managementType: "IT Managed Apps",
  },
  {
    id: "4",
    url: "slack.com",
    accessCount: 42157,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "Messaging and Communication",
    managementType: "IT Managed Apps",
  },
  {
    id: "5",
    url: "youtube.com",
    accessCount: 23654,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Non-Productive",
        scope: "Organization",
      },
      {
        productivityLevel: "Productive",
        scope: "Department",
        scopeValue: "IT",
      },
      {
        productivityLevel: "Productive",
        scope: "Sector",
        scopeValue: "Marketing",
      },
    ],
    approvalStatus: "Under Analysis",
    riskLevel: "Medium",
    appType: "Entertainment",
    managementType: "Non-IT Managed",
  },
  {
    id: "6",
    url: "netflix.com",
    accessCount: 1234,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Non-Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Unsanctioned",
    riskLevel: "High",
    appType: "Entertainment",
    managementType: "Non-IT Managed",
  },
  {
    id: "7",
    url: "github.com",
    accessCount: 38952,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Department",
        scopeValue: "IT",
      },
      {
        productivityLevel: "Neutral",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "Productivity",
    managementType: "IT Managed Apps",
  },
  {
    id: "8",
    url: "office.com",
    accessCount: 67891,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "Productivity",
    managementType: "IT Managed Apps",
  },
  {
    id: "9",
    url: "instagram.com",
    accessCount: 12543,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Non-Productive",
        scope: "Organization",
      },
      {
        productivityLevel: "Productive",
        scope: "Sector",
        scopeValue: "Marketing",
      },
    ],
    approvalStatus: "Under Analysis",
    riskLevel: "Medium",
    appType: "Social Media",
    managementType: "Non-IT Managed",
  },
  {
    id: "10",
    url: "zoom.us",
    accessCount: 45678,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "Messaging and Communication",
    managementType: "IT Managed Apps",
  },
  {
    id: "11",
    url: "notion.so",
    accessCount: 15789,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Productive",
        scope: "Organization",
      },
    ],
    approvalStatus: "Sanctioned",
    riskLevel: "Low",
    appType: "Productivity",
    managementType: "IT Managed Apps",
  },
  {
    id: "12",
    url: "spotify.com",
    accessCount: 8765,
    isSaas: true,
    productivityRules: [
      {
        productivityLevel: "Non-Productive",
        scope: "Organization",
      },
      {
        productivityLevel: "Neutral",
        scope: "Department",
        scopeValue: "IT",
      },
    ],
    approvalStatus: "Under Analysis",
    riskLevel: "Medium",
    appType: "Entertainment",
    managementType: "Employee Purchases",
  },
];

const ProductivityRulesList = ({ rules }: { rules: ProductivityRule[] }) => {
  return (
    <div className="space-y-1">
      {rules.map((rule, index) => (
        <Tag
          key={index}
          color={
            rule.productivityLevel === "Productive"
              ? "success"
              : rule.productivityLevel === "Neutral"
                ? "default"
                : "error"
          }
          style={{ marginBottom: 4 }}
        >
          {rule.productivityLevel}
          {rule.scope === "Organization"
            ? " for Organization"
            : ` for ${rule.scope} ${rule.scopeValue}`}
        </Tag>
      ))}
    </div>
  );
};

interface ClassificationTableProps {
  data?: DataType[];
}

const ClassificationTable = ({
  data = defaultData,
}: ClassificationTableProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const columns: ColumnsType<DataType> = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      sorter: (a, b) => a.url.localeCompare(b.url),
      width: 200,
    },
    {
      title: "Access Count",
      dataIndex: "accessCount",
      key: "accessCount",
      sorter: (a, b) => a.accessCount - b.accessCount,
      render: (value) => value.toLocaleString(),
      width: 120,
    },
    {
      title: "Is SaaS?",
      dataIndex: "isSaas",
      key: "isSaas",
      render: (value) => (
        <Tag color={value ? "blue" : "default"}>
          {value ? "SaaS" : "Non-SaaS"}
        </Tag>
      ),
      width: 100,
    },
    {
      title: "Productivity Rules",
      dataIndex: "productivityRules",
      key: "productivityRules",
      render: (rules) => <ProductivityRulesList rules={rules} />,
      width: 300,
    },
    {
      title: "Approval",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      render: (value) => (
        <Tag
          color={
            value === "Sanctioned"
              ? "success"
              : value === "Under Analysis"
                ? "warning"
                : "error"
          }
        >
          {value}
        </Tag>
      ),
      width: 120,
    },
    {
      title: "Risk Level",
      dataIndex: "riskLevel",
      key: "riskLevel",
      render: (value) => (
        <Tag
          color={
            value === "Low"
              ? "success"
              : value === "Medium"
                ? "warning"
                : "error"
          }
        >
          {value}
        </Tag>
      ),
      width: 100,
    },
    {
      title: "App Type",
      dataIndex: "appType",
      key: "appType",
      width: 150,
    },
    {
      title: "Management",
      dataIndex: "managementType",
      key: "managementType",
      render: (value) => (
        <Tag color={value === "IT Managed Apps" ? "blue" : "default"}>
          {value}
        </Tag>
      ),
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setSelectedRow(record.id)}
        />
      ),
      width: 80,
      fixed: "right",
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Filter URLs..."
          prefix={<SearchOutlined />}
          style={{ maxWidth: 300 }}
        />
        <Button icon={<FilterOutlined />}>Filters</Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 1500 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      <RuleConfigurationModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        rowId={selectedRow}
      />
    </div>
  );
};

export default ClassificationTable;
