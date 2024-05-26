"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function SidebarTile({
  icon,
  title,
  href,
  isDisabled,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  isDisabled?: boolean;
}) {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={`bg-white flex px-7 py-3 items-center space-x-4 ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-n75 transition duration-200"
      } ${currentPath === href ? "border-l-4 border-main" : ""}`}
    >
      {icon}
      <p className="text-n800">{title}</p>
    </Link>
  );
}
