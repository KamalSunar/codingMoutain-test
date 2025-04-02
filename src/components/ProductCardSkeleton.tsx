import React from "react";
import { Skeleton } from "./Skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="productCard">
      <Skeleton width="100%" height="200px" />
      <div className="productCard-details">
        <p>
          <Skeleton width="50%" height="20px" margin="0 0 5px 0" />
        </p>
        <h5>
          <Skeleton width="100%" height="60px" />
        </h5>
        <div>
          <Skeleton width="100%" height="35px" />
        </div>
      </div>
    </div>
  );
};
