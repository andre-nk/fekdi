"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-n75`}>
        <main className="w-full flex min-h-screen bg-n75">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
