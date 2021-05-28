import Grid from "@material-ui/core/Grid";
import React, { ReactElement, useEffect } from "react";
import { useProductApi } from "../shared/ProductsApi";
import Product from "../types/Product";
import LoadingSpinner from "./LoadingSpinner";
import ProductDetail from "./ProductDetail";

function ProductList(): ReactElement {
  const [products] = useProductApi<Product[]>("get", "products");

  if (!products) return <LoadingSpinner />;
  return (
    <>
      {products.map((product) => (
        <ProductDetail product={product} key={product.id} />
      ))}
    </>
  );
}

export default ProductList;
