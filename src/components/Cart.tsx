import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useStore } from "../Store";
import Product from "../types/Product";

const paperStyle = {
  display: "flex",
  marginTop: "2vh",
};
export default function Cart() {
  const { store, dispatch } = useStore();

  const products = store.cart
    .reduce((acc: Product[], product) => {
      acc.find((product_) => product_.id === product.id) || acc.push(product);
      return acc;
    }, [])
    .sort((productA, productB) => Number(productA.id) - Number(productB.id));

  const productCount = (product: Product) =>
    store.cart.filter((_product) => _product.id === product.id).length;

  const onAddOne = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const onRemoveOne = (product: Product) => {
    dispatch({ type: "REMOVE_FROM_CART", product });
  };

  //reduce fn

  const sumUp = (acc: number, product: Product) => acc + Number(product.price);

  const totalSum = store.cart.reduce(sumUp, 0);

  return (
    <Container maxWidth="lg">
      {products.map((product) => (
        <Grid container spacing={2} key={product.id}>
          <Grid item xs={12}>
            <Paper style={paperStyle}>
              <img
                src={product.image}
                style={{ marginLeft: "1vw", width: "180px", height: "180px" }}
              />
              <Grid spacing={1}>
                <Grid item xs={6}>
                  <h2>{product.title}</h2>
                  <span>{`${product.price} €`}</span>
                </Grid>
              </Grid>
              <Grid spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAddOne(product)}
                >
                  <AddIcon />
                </Button>
                <div>{productCount(product)}</div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onRemoveOne(product)}
                >
                  <RemoveIcon />
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ))}
      <Grid container>
        <span>{`Sum(${store.cart.length} Articles): ${totalSum.toFixed(
          2
        )} €`}</span>
      </Grid>
    </Container>
  );
}
