import React from "react";
import { Skeleton } from "./Skeleton";

export const ProductDetailSkeleton = () => {
  return (
    <div className="container productDetail-wrapper">
      <div className="productDetails">
        <Skeleton width="100%" height="650px" />
        <div className="productCard-details">
          <p>
            <Skeleton width="70%" height="50px" margin="0 0 10px 0" />
          </p>
          <h5>
            <Skeleton width="50%" height="20px" margin="0 0 5px 0" />
            <Skeleton width="30%" height="20px" margin="0 0 2rem 0" />
          </h5>
          <div>
            <Skeleton width="100%" height="100px" margin="0 0 2rem 0" />
            <Skeleton width="50%" height="200px" margin="0 0 2rem 0" />
            <Skeleton width="50%" height="50px" />
          </div>
        </div>
      </div>
      <Skeleton width="100%" height="200px" />
    </div>
  );
};
