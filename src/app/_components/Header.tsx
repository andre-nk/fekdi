import { Button, ShareIcon, TextDropdownButton } from "evergreen-ui";
import React from "react";
import VersionDropdown from "./VersionDropdown";
import ModeDropdown from "./ModeDropdown";

export default function Header() {
  return (
    <div className="w-full flex p-6 justify-between">
      <h2 className="text-2xl font-medium">Shipping SOP</h2>
      <div className="flex justify-end items-center space-x-5">
        <ModeDropdown />
        <VersionDropdown />
        <Button
          size="medium"
          backgroundColor="#0021A5"
          iconBefore={<ShareIcon size={12} color="white" />}
        >
          <p className="text-white font-medium">Share</p>
        </Button>
      </div>
    </div>
  );
}
