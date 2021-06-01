import React, { ReactElement, SyntheticEvent } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  makeStyles,
  Paper,
  Typography,
  Theme,
  createStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useStore } from "../Store";
import Product from "../types/Product";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    sum: {
      display: "flex",
      alignSelf: "flex-end",
      justifyContent: "flex-end",
    },
    cartSum: {
      fontWeight: "bold",
      fontSize: "3vh",
      marginTop: "1vh",
    },
  })
);

const paperStyle = {
  display: "flex",
  marginTop: "2vh",
};
export default function Cart(): ReactElement {
  const classes = useStyles();
  const { store, dispatch } = useStore();
  const history = useHistory();

  const products = store.cart
    .reduce((acc: Product[], product) => {
      acc.find((product_) => product_.id === product.id) || acc.push(product);
      return acc;
    }, [])
    .sort((productA, productB) => Number(productA.id) - Number(productB.id));

  const productCount = (product: Product) =>
    store.cart.filter((_product) => _product.id === product.id).length;

  const onAddOne = (e: SyntheticEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", product });
  };

  const onRemoveOne = (e: SyntheticEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: "REMOVE_FROM_CART", product });
  };

  const onDelete = (e: SyntheticEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_FROM_CART", product });
  };

  const goToDetails = (product: Product) => {
    history.push(`/products/${product.id}`);
  };

  const sumUp = (acc: number, product: Product) => acc + Number(product.price);

  const totalSum = store.cart.reduce(sumUp, 0);

  return (
    <Container maxWidth="lg">
      {products.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.id}
          onClick={() => goToDetails(product)}
          className={classes.root}
        >
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
                  onClick={(e) => onAddOne(e, product)}
                >
                  <AddIcon />
                </Button>
                <Typography>{productCount(product)}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => onRemoveOne(e, product)}
                >
                  <RemoveIcon />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => onDelete(e, product)}
                >
                  <DeleteForeverIcon />
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ))}
      {store.cart.length ? (
        <Grid container spacing={0} className={classes.sum}>
          <span className={classes.cartSum}>{`Sum(${
            store.cart.length
          } Articles): ${totalSum.toFixed(2)} €`}</span>
        </Grid>
      ) : (
        <h2>No Items in the cart</h2>
      )}
    </Container>
  );
}
