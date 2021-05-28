import Grid from "@material-ui/core/Grid";
import React, { ReactElement } from "react";
import { useProductApi } from "../shared/ProductsApi";
import Product from "../types/Product";
import LoadingSpinner from "./LoadingSpinner";
import ProductListItem from "./ProductListItem";

function ProductList(): ReactElement {
  const [products] = useProductApi<Product[]>("get", "products");

  if (!products) return <LoadingSpinner />;
  return (
    <>
      {products.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
    </>
  );
}

export default ProductList;
