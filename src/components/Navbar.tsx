import React, { ReactElement, SyntheticEvent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../Store";
import ProductSearch from "./ProductSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "black",
  },
  cart: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Navbar(): ReactElement {
  const classes = useStyles();

  const { store } = useStore();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToCart = () => {
    history.push("/cart");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <Link to="/home">
              <MenuItem onClick={handleClose}>Home</MenuItem>
            </Link>
            <Link to="/products/page/1">
              <MenuItem onClick={handleClose}>Products</MenuItem>
            </Link>
            <Link to="/contact">
              <MenuItem onClick={handleClose}>Contact</MenuItem>
            </Link>
          </Menu>
          <Typography variant="h6" className={classes.title}></Typography>
          <ProductSearch />
          <Button color="inherit" className={classes.cart} onClick={goToCart}>
            <span>{store.cart.length}</span>
            <ShoppingCartIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
