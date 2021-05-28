import "./App.css";
import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { StoreProvider } from "./Store";

function App() {
  return (
    <>
      <StoreProvider>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </StoreProvider>
    </>
  );
}

export default App;
