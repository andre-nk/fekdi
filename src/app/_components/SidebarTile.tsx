import { Link, DashboardIcon } from "evergreen-ui";
import React from "react";

export default function SidebarTile({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white flex px-7 py-3 items-center space-x-4"
    >
      {icon}
      <p className="text-n800">{title}</p>
    </Link>
  );
}
