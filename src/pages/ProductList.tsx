import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useGetProductList } from "../hooks/getProductList";
import { PaginationProps, Product } from "../types/types";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    limit: 10,
    skip: 0,
    select: "title,category,price,thumbnail,discountPercentage",
  });

  const { data, loading, error } = useGetProductList(pagination);

  const handleProduct = (id: number) => navigate(`/product/${id}`);

  useEffect(() => {
    if (!loading && data && data?.products) {
      setProductList((prev) => {
        const newProducts = data?.products || [];
        return [...prev, ...newProducts];
      });
    }
  }, [loading]);

  return (
    <div className="productList">
      <h2>Product List</h2>

      {error && <span className="error">{error}</span>}
      {!error && (
        <>
          <div className="productList-wrapper">
            {loading &&
              Array.from(Array(Math.floor(5)).keys())?.map((item) => (
                <ProductCardSkeleton />
              ))}
            {productList?.length > 0 &&
              productList?.map((product) => (
                <ProductCard product={product} handleProduct={handleProduct} />
              ))}

            {/* Loader  */}
            {loading && (
              <div className="productList-center">
                <Loader />
              </div>
            )}
          </div>
          {productList?.length > 0 && (
            <div className="productList-showMore productList-center">
              <button
                className="btn btn-primary"
                type="button"
                role="button"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    skip: prev.skip + prev.limit,
                  }))
                }
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
