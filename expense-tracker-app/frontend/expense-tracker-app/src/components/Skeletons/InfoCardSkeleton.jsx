import React from 'react';
import Skeleton from '../ui/Skeleton';

const InfoCardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
};

export default InfoCardSkeleton;