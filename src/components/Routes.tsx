import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/products/:id">
        <ProductDetails />
      </Route>
      <Route path="/products">
        <ProductList />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  );
}

export default Routes;
