import React, { useEffect, useState } from "react";
import { useGetProductList } from "../hooks/getProductList";
import { PaginationProps, Product } from "../types/types";
import ProductCard from "../components/ProductCard";

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    limit: 10,
    skip: 0,
    select: "title,category,price,thumbnail",
  });

  const { data, loading, error, refetch } = useGetProductList(pagination);

  useEffect(() => {
    if (!loading && data && data?.products) {
      setProductList((prev) => {
        const newProducts = data?.products || [];
        return [...prev, ...newProducts];
      });
    }
  }, [loading]);

  console.log("products", data, productList, loading);
  return (
    <div className="productList">
      <h2>Product List</h2>

      <div className="productList-wrapper">
        {!loading &&
          productList?.length > 0 &&
          productList?.map((product) => <ProductCard product={product} />)}
      </div>
    </div>
  );
};

export default ProductList;
