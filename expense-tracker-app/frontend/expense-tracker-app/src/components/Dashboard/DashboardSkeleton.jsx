import React from "react";
import Skeleton from "../ui/Skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>

      {/* Main Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;