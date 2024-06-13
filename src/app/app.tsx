// pages/_app.tsx

import type { AppProps } from "next/app";
import React from "react";
import RootLayout from "@/app/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
