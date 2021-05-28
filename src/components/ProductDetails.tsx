import React, { SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { useProductApi } from "../shared/ProductsApi";
import Product from "../types/Product";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LoadingSpinner from "./LoadingSpinner";
import Grid from "@material-ui/core/Grid";
import { Button, Paper } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStore } from "../Store";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product] = useProductApi<Product>("get", `products/${id}`);
  const { store, dispatch } = useStore();

  if (!product) return <LoadingSpinner />;

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: "1vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={product.image}
                alt={product.title}
                height="50%"
                width="50%"
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <h1>{product.title}</h1>
            <span>{product.description}</span>
            <h2>{`${product.price} €`}</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
            >
              <ShoppingCartIcon /> Add To Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetails;
