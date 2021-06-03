import {
  createStyles,
  fade,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import Product from "../types/Product";
import SearchIcon from "@material-ui/icons/Search";
import { productApi, useProductApi } from "../shared/ProductsApi";
import LoadingSpinner from "./LoadingSpinner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.45),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.75),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    paper: {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
    },
    searchResults: {
      overflow: "visible",
    },
  })
);

function ProductSearch(): ReactElement {
  const classes = useStyles();
  const [products] = useProductApi<Product[]>("get", "products");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const history = useHistory();

  if (!products) return <LoadingSpinner />;

  const onClick = (product: Product) => {
    setSearchResults([]);
    setSearchTerm("");
    history.push(`/products/${product.id}`);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchTerm(inputValue);
    if (inputValue.length > 2) {
      setSearchResults(() => {
        return products.filter((product) => {
          const title = product.title.toLowerCase();
          if (title.includes(inputValue)) {
            return product;
          }
        });
      });
    } else {
      setSearchResults([]);
    }
  };
  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={onSearch}
          placeholder="Search…"
          classes={{
            /* root: classes.inputRoot, */
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        {searchResults.length > 0 && (
          <div className={classes.searchResults}>
            {searchResults.map((product) => {
              return (
                <Paper
                  key={product.id}
                  className={classes.paper}
                  onClick={() => onClick(product)}
                >
                  <img
                    src={product.image}
                    width="50px"
                    height="50px"
                    alt={product.title}
                  />
                  <div>{product.title}</div>;
                </Paper>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductSearch;
