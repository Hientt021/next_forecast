import StoreProvider from "@/src/lib/redux/StoreProvider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const Dimension = dynamic(() => import("@/src/hook/useDevice"), {
  ssr: false,
});

const SnackProvider = dynamic(
  () => import("@/src/lib/notistack/SnackbarProvider"),
  {
    ssr: false,
  }
);
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="main" className={inter.className}>
        <StoreProvider>
          <SnackProvider>
            <Dimension />
            {children}
          </SnackProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
