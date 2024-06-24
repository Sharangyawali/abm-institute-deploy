// components/Skeleton.js
'use client';

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MySkeleton = () => {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="flex flex-col gap-4">
        <Skeleton height={50} width={`100%`} />
        <Skeleton height={30} width={`75%`} />
        <Skeleton height={30} width={`50%`} />
      </div>
    </SkeletonTheme>
  );
};

export default MySkeleton;
