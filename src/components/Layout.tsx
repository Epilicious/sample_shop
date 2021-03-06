import React, { ReactElement } from "react";
import Header from "./Header";

function Layout(props: { children: ReactElement }): ReactElement {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
