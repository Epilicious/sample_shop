import React, { ReactElement } from "react";
import Navbar from "./Navbar";

function Header(): ReactElement {
  return (
    <>
      <h1>My Online Shop</h1>
      <Navbar />
    </>
  );
}

export default Header;
