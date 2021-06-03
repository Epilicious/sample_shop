import "./App.css";
import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { StoreProvider, useStore } from "./Store";

function App() {
  const { dispatch } = useStore();

  useEffect(() => dispatch({ type: "GET_LOCALSTORAGE" }), [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
