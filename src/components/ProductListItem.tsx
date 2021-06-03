import React, { ReactElement, SyntheticEvent } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Product from "../types/Product";
import LoadingSpinner from "./LoadingSpinner";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from "../utils/useCart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "2vh",
      marginBottom: "2vh",
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

interface Props {
  product: Product;
}

function ProductDetail(props: Props): ReactElement {
  const classes = useStyles();
  const { onAddOne } = useCart();
  const product = props.product;

  const history = useHistory();
  if (!product) return <LoadingSpinner />;

  const goToDetails = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <div className={classes.root}>
      <Paper
        onClick={goToDetails}
        className={classes.paper}
        style={{ cursor: "pointer" }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={product.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`id: ${product.id}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => onAddOne(e, product)}
                  >
                    <ShoppingCartIcon /> Add To Cart
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{`${product.price} €`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProductDetail;
