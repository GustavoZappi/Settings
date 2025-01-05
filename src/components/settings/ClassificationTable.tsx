import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Filter, PencilIcon } from "lucide-react";
import RuleConfigurationModal from "./RuleConfigurationModal";

type ProductivityRule = {
  productivityLevel: "Productive" | "Non-Productive" | "Neutral";
  scope: "Organization" | "Sector" | "Department" | "Cost Center";
  scopeValue?: string;
};

interface ClassificationTableProps {
  data?: Array<{
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
  }>;
}

const defaultData = [
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
] as const;

const ProductivityRulesList = ({ rules }: { rules: ProductivityRule[] }) => {
  return (
    <div className="space-y-1">
      {rules.map((rule, index) => (
        <Badge
          key={index}
          variant={
            rule.productivityLevel === "Productive"
              ? "default"
              : rule.productivityLevel === "Neutral"
                ? "secondary"
                : "destructive"
          }
          className="mr-1"
        >
          {rule.productivityLevel}
          {rule.scope === "Organization"
            ? " for Organization"
            : ` for ${rule.scope} ${rule.scopeValue}`}
        </Badge>
      ))}
    </div>
  );
};

const ClassificationTable = ({
  data = defaultData,
}: ClassificationTableProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <Input placeholder="Filter URLs..." className="max-w-sm" />
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button variant="ghost" className="flex items-center gap-1">
                  URL
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[120px]">
                <Button variant="ghost" className="flex items-center gap-1">
                  Access Count
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">Is SaaS?</TableHead>
              <TableHead className="w-[300px]">Productivity Rules</TableHead>
              <TableHead className="w-[120px]">Approval</TableHead>
              <TableHead className="w-[100px]">Risk Level</TableHead>
              <TableHead className="w-[150px]">App Type</TableHead>
              <TableHead className="w-[150px]">Management</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.url}</TableCell>
                <TableCell>{row.accessCount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={row.isSaas ? "default" : "secondary"}>
                    {row.isSaas ? "SaaS" : "Non-SaaS"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ProductivityRulesList rules={row.productivityRules} />
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.approvalStatus === "Sanctioned"
                        ? "default"
                        : row.approvalStatus === "Under Analysis"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {row.approvalStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.riskLevel === "Low"
                        ? "default"
                        : row.riskLevel === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {row.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell>{row.appType}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.managementType === "IT Managed Apps"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {row.managementType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedRow(row.id)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RuleConfigurationModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        rowId={selectedRow}
      />
    </div>
  );
};

export default ClassificationTable;
