import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  margin?: string;
  shape?: "circle" | "rectangle";
}

export const Skeleton = ({
  width = "100px",
  height = "50px",
  margin,
  shape = "rectangle",
}: SkeletonProps) => (
  <div
    className={`skeleton skeleton-${shape}`}
    style={{ width: width, height: height, margin: margin }}
  />
);
