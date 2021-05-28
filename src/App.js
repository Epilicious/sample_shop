import "./App.css";
import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";

function App() {
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
