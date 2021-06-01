import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import BasicPagination from "./BasicPagination";
import Cart from "./Cart";
import Contact from "./Contact";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/products/page/:num">
        <ProductList />
      </Route>
      <Route path="/products/:id">
        <ProductDetails />
      </Route>
      <Route path="/products">
        <ProductList />
      </Route>
      <Route path="/contact">
        <Contact />
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
