import React from "react";
import Navbar from '../navigation/navbar';
import Footer from "./footer";

type LayoutProps = { children: React.ReactNode };

const Layout= ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;