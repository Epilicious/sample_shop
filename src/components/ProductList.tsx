import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useProductApi } from "../shared/ProductsApi";
import Product from "../types/Product";
import BasicPagination from "./BasicPagination";
import FilterForm from "./FilterForm";
import LoadingSpinner from "./LoadingSpinner";
import ProductListItem from "./ProductListItem";

function ProductList(): ReactElement {
  const [products] = useProductApi<Product[]>("get", "products");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const { num } = useParams<{ num: string }>();
  const [currentPage, setCurrentPage] = useState(Number(num));
  const [productsPerPage, setProductsPerPage] = useState(5);
  const history = useHistory();

  // new state filtered products, setter to filterform, getter mappen

  useEffect(() => {
    setCurrentPage(Number(num));
  }, [num]);

  if (!products) return <LoadingSpinner />;

  // Get current Products
  const indexOfLastChar = currentPage * productsPerPage;
  const indexOfFirstChar = indexOfLastChar - productsPerPage;
  const currentProducts = filteredProducts
    ? filteredProducts.slice(indexOfFirstChar, indexOfLastChar)
    : products.slice(indexOfFirstChar, indexOfLastChar);

  const onChange = (event: ChangeEvent<unknown>, page: number) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    history.push(`/products/page/${page}`);
  };

  return (
    <>
      <FilterForm
        setFilteredProducts={setFilteredProducts}
        setCurrentPage={setCurrentPage}
        products={products}
      />
      {currentProducts.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
      <BasicPagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={
          filteredProducts ? filteredProducts.length : products.length
        }
        onChange={onChange}
      />
    </>
  );
}

export default ProductList;
