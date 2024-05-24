import {
  Avatar,
  CaretDownIcon,
  CreditCardIcon,
  DashboardIcon,
  FlowBranchIcon,
  PeopleIcon,
  SettingsIcon,
} from "evergreen-ui";
import React from "react";
import SidebarTile from "./SidebarTile";

export default function Sidebar() {
  return (
    <div className="lg:w-1/4 xl:w-[22.5%] bg-n100 flex flex-col justify-between min-h-screen border-n400 border-r">
      <div className="flex flex-col">
        <button
          onClick={() => {}}
          className="w-full flex justify-between items-center hover:bg-white p-6 rounded-lg transition-all duration-300"
        >
          <div className="flex space-x-4 items-center">
            <Avatar name="Jeroen Ransijn" size={32} />
            <p className="font-medium text-sm">Jeroen</p>
          </div>
          <div className="p-1 bg-white border rounded-md border-n300">
            <CaretDownIcon size={12} color="black" />
          </div>
        </button>
        <div className="my-2 text-sm flex flex-col w-full space-y-[1px]">
          <SidebarTile
            icon={<DashboardIcon size={16} color="#8F95B2" />}
            title="Dashboard"
            href="/"
          />
          <SidebarTile
            icon={<FlowBranchIcon size={16} color="#8F95B2" />}
            title="SOP"
            href="/"
          />
          <SidebarTile
            icon={<PeopleIcon size={16} color="#8F95B2" />}
            title="Member"
            href="/"
          />
          <SidebarTile
            icon={<SettingsIcon size={16} color="#8F95B2" />}
            title="Settings"
            href="/"
          />
          <SidebarTile
            icon={<CreditCardIcon size={16} color="#8F95B2" />}
            title="Billing"
            href="/"
          />
        </div>
      </div>
      <button
        onClick={() => {}}
        className="w-full flex justify-between items-center hover:bg-white p-6 rounded-lg transition-all duration-300"
      >
        <div className="flex space-x-4 items-center">
          <Avatar name="Jeroen Ransijn" size={32} />
          <div className="flex flex-col items-start">
            <p className="font-medium text-xs">Jeroen</p>
            <p className="font-light text-n600 text-[10px]">jeroen@fekdi.com</p>
          </div>
        </div>
        <div className="p-1 bg-white border rounded-md border-n300">
          <CaretDownIcon size={12} color="black" />
        </div>
      </button>
    </div>
  );
}
