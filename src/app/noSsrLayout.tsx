"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import dynamic from "next/dynamic";

function noSsrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex min-h-screen bg-n75">
      <Sidebar />
      {children}
    </main>
  );
}

export default dynamic(() => Promise.resolve(noSsrLayout), {
  ssr: false,
});
