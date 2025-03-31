import { useState, useEffect, useCallback } from "react";
import { getAllProducts } from "../api/product.api";
import { PaginationProps, type ProductsResponse } from "../types/types";

export const useGetProductList = (pagination: PaginationProps) => {
  const [product, setProduct] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(pagination);
      setProduct(response);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data: product, loading, error, refetch: fetchProducts };
};
