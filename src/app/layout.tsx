// layout.tsx

import { CartProvider } from "@/Context/CartContext";
import Head from "next/head";
import React from "react";

const metadata = {
  title: "iksana Opticals",
  description: "Generated by Next.js",
};

const RootLayout = ({ children, title }: any) => {
  return (
    <html lang="en">
      <Head>
        <title>{title || metadata.title}</title>
      </Head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
};

export default RootLayout;
