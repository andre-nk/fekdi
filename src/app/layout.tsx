"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import NoSsrLayout from "./noSsrLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-n75`}>
        <NoSsrLayout>{children}</NoSsrLayout>
      </body>
    </html>
  );
}
