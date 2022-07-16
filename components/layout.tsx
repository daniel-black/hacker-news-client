import React from "react";
import Footer from "./footer";
import Navbar from './navbar';

type Props = { children: React.ReactNode };

// <Layout /> wraps <Container />
const Layout= ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;