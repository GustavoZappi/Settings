import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, PieChart, Activity, Box } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

const MetricsCard = ({
  title = "Metric",
  value = "0",
  icon = <Activity />,
  description = "No description available",
}: MetricsCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

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
    <div className="w-full p-4 space-y-4 bg-gray-50">
      <h2 className="text-xl font-semibold">Metrics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total URLs"
          value={totalUrls.toString()}
          icon={<Box />}
          description="Total number of URLs in system"
        />
        <MetricsCard
          title="SaaS URL %"
          value={`${saasPercentage}%`}
          icon={<PieChart />}
          description="Percentage of SaaS applications"
        />
        <MetricsCard
          title="Risk Level Distribution"
          value={`${riskLevels.high}% High Risk`}
          icon={<Activity />}
          description={`${riskLevels.medium}% Medium, ${riskLevels.low}% Low Risk`}
        />
        <MetricsCard
          title="Application Types"
          value={`${appTypes.external}% External`}
          icon={<BarChart />}
          description={`${appTypes.internal}% Internal, ${appTypes.unknown}% Unknown`}
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
