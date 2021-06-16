import React, { ReactElement } from "react";
import Navbar from "./Navbar";

function Header(): ReactElement {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ alignSelf: "center" }}>My Online Shop</h1>
        <Navbar />
      </div>
    </>
  );
}

export default Header;
