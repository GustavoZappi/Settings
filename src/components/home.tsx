import React from "react";
import MetricsOverview from "./settings/MetricsOverview";
import ClassificationTable from "./settings/ClassificationTable";

interface HomeProps {
  pageTitle?: string;
}

const Home = ({ pageTitle = "Settings Dashboard" }: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
        </div>

        {/* Metrics Overview Section */}
        <MetricsOverview />

        {/* Classification Table Section */}
        <ClassificationTable />
      </div>
    </div>
  );
};

export default Home;
