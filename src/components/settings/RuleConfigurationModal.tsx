import React, { useState } from "react";
import { Modal, Select, Button, Space, Typography, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface RuleConfigurationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  rowId?: string | null;
}

interface ProductivityRule {
  productivityLevel: string;
  scope: string;
  scopeValue: string;
}

const APP_TYPES = [
  "Productivity",
  "CRM",
  "ERP",
  "Search Engine",
  "Social Media",
  "Messaging and Communication",
  "Entertainment",
  "Education",
  "Health and Fitness",
  "Finance",
  "Shopping",
  "Games",
  "Navigation and Maps",
  "Photography and Video",
];

const RISK_LEVELS = ["High", "Medium", "Low"];
const APPROVAL_STATUS = ["Sanctioned", "Unsanctioned", "Under Analysis"];
const MANAGED_TYPES = [
  "IT Managed Apps",
  "Non-IT Managed",
  "Employee Purchases",
];
const PRODUCTIVITY_LEVELS = ["Productive", "Non-Productive", "Neutral"];
const SCOPE_TYPES = ["Organization", "Sector", "Department", "Cost Center"];

const SelectButtonGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div style={{ marginBottom: 16 }}>
    <Typography.Text strong style={{ display: "block", marginBottom: 8 }}>
      {label}
    </Typography.Text>
    <Space wrap>
      {options.map((option) => (
        <Button
          key={option}
          type={value === option ? "primary" : "default"}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </Space>
  </div>
);

const RuleConfigurationModal = ({
  isOpen = false,
  onClose = () => {},
  rowId = null,
}: RuleConfigurationModalProps) => {
  const [appType, setAppType] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [managedType, setManagedType] = useState("");
  const [productivityRules, setProductivityRules] = useState<
    ProductivityRule[]
  >([{ productivityLevel: "", scope: "", scopeValue: "" }]);

  const addProductivityRule = () => {
    setProductivityRules([
      ...productivityRules,
      { productivityLevel: "", scope: "", scopeValue: "" },
    ]);
  };

  return (
    <Modal
      title="Editing google.com"
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={onClose}>
          Save Changes
        </Button>,
      ]}
    >
      <div style={{ padding: "20px 0" }}>
        <SelectButtonGroup
          label="App Type"
          options={APP_TYPES}
          value={appType}
          onChange={setAppType}
        />

        <SelectButtonGroup
          label="Risk Level"
          options={RISK_LEVELS}
          value={riskLevel}
          onChange={setRiskLevel}
        />

        <SelectButtonGroup
          label="Management Type"
          options={MANAGED_TYPES}
          value={managedType}
          onChange={setManagedType}
        />

        <SelectButtonGroup
          label="Approval Status"
          options={APPROVAL_STATUS}
          value={approvalStatus}
          onChange={setApprovalStatus}
        />

        <Divider />

        <div>
          <Title level={5}>Productivity rules for google.com</Title>
          {productivityRules.map((rule, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Select
                style={{ width: 200 }}
                value={rule.productivityLevel}
                onChange={(value) => {
                  const newRules = [...productivityRules];
                  newRules[index].productivityLevel = value;
                  setProductivityRules(newRules);
                }}
                placeholder="Select productivity"
                options={PRODUCTIVITY_LEVELS.map((level) => ({
                  label: level,
                  value: level,
                }))}
              />

              <Typography.Text>For the</Typography.Text>

              <Select
                style={{ width: 200 }}
                value={rule.scope}
                onChange={(value) => {
                  const newRules = [...productivityRules];
                  newRules[index].scope = value;
                  newRules[index].scopeValue = "";
                  setProductivityRules(newRules);
                }}
                placeholder="Select scope"
                options={SCOPE_TYPES.map((scope) => ({
                  label: scope,
                  value: scope,
                }))}
              />

              <Select
                style={{ width: 200 }}
                value={rule.scopeValue}
                onChange={(value) => {
                  const newRules = [...productivityRules];
                  newRules[index].scopeValue = value;
                  setProductivityRules(newRules);
                }}
                placeholder="Select value"
                disabled={rule.scope === "Organization"}
                options={
                  rule.scope === "Sector"
                    ? [
                        { label: "Marketing", value: "Marketing" },
                        { label: "Sales", value: "Sales" },
                        { label: "Engineering", value: "Engineering" },
                      ]
                    : rule.scope === "Department"
                      ? [
                          { label: "IT", value: "IT" },
                          { label: "HR", value: "HR" },
                        ]
                      : rule.scope === "Cost Center"
                        ? [
                            { label: "CC1", value: "CC1" },
                            { label: "CC2", value: "CC2" },
                          ]
                        : []
                }
              />
            </div>
          ))}
          <Button
            type="dashed"
            onClick={addProductivityRule}
            style={{ width: "100%" }}
            icon={<PlusOutlined />}
          >
            Add Productivity Rule
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RuleConfigurationModal;
