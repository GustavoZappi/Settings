import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

interface SelectButtonGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectButtonGroup = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: SelectButtonGroupProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          variant="outline"
          size="sm"
          className={cn(
            "flex-1 min-w-[120px]",
            value === option
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "",
          )}
          onClick={() => onChange(option)}
          disabled={disabled}
        >
          {option}
        </Button>
      ))}
    </div>
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-white">
        <DialogHeader>
          <DialogTitle>Editing google.com</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
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

          {/* Productivity Rules */}
          <div className="space-y-4">
            <Label>Productivity rules for google.com</Label>
            {productivityRules.map((rule, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <Select
                  value={rule.productivityLevel}
                  onValueChange={(value) => {
                    const newRules = [...productivityRules];
                    newRules[index].productivityLevel = value;
                    setProductivityRules(newRules);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select productivity" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCTIVITY_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-sm text-gray-500">For the</span>

                <Select
                  value={rule.scope}
                  onValueChange={(value) => {
                    const newRules = [...productivityRules];
                    newRules[index].scope = value;
                    newRules[index].scopeValue = ""; // Reset scope value when scope changes
                    setProductivityRules(newRules);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCOPE_TYPES.map((scope) => (
                      <SelectItem key={scope} value={scope}>
                        {scope}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={rule.scopeValue}
                  onValueChange={(value) => {
                    const newRules = [...productivityRules];
                    newRules[index].scopeValue = value;
                    setProductivityRules(newRules);
                  }}
                  disabled={rule.scope === "Organization"}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select value" />
                  </SelectTrigger>
                  <SelectContent>
                    {rule.scope === "Sector" && [
                      <SelectItem key="marketing" value="Marketing">
                        Marketing
                      </SelectItem>,
                      <SelectItem key="sales" value="Sales">
                        Sales
                      </SelectItem>,
                      <SelectItem key="engineering" value="Engineering">
                        Engineering
                      </SelectItem>,
                    ]}
                    {rule.scope === "Department" && [
                      <SelectItem key="it" value="IT">
                        IT
                      </SelectItem>,
                      <SelectItem key="hr" value="HR">
                        HR
                      </SelectItem>,
                    ]}
                    {rule.scope === "Cost Center" && [
                      <SelectItem key="cc1" value="CC1">
                        CC1
                      </SelectItem>,
                      <SelectItem key="cc2" value="CC2">
                        CC2
                      </SelectItem>,
                    ]}
                  </SelectContent>
                </Select>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addProductivityRule}
            >
              Add Productivity Rule
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RuleConfigurationModal;
