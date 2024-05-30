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
    <div className="lg:w-1/4 xl:w-[20vw] bg-n100 flex flex-col justify-between min-h-screen border-n400 border-r">
      <div className="flex flex-col">
        <button
          onClick={() => {}}
          className="w-full flex justify-between items-center hover:bg-white p-6 rounded-lg transition-all duration-300"
        >
          <div className="flex space-x-4 items-center">
            <Avatar name="Acme Company" size={32} />
            <p className="font-medium text-sm">Acme Company</p>
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
            href="/sop"
          />
          <SidebarTile
            icon={<PeopleIcon size={16} color="#8F95B2" />}
            title="Member"
            href="/member"
            isDisabled
          />
          <SidebarTile
            icon={<SettingsIcon size={16} color="#8F95B2" />}
            title="Settings"
            href="/settings"
            isDisabled
          />
          <SidebarTile
            icon={<CreditCardIcon size={16} color="#8F95B2" />}
            title="Billing"
            href="/billing"
            isDisabled
          />
        </div>
      </div>
      <button
        onClick={() => {}}
        className="w-full flex justify-between items-center hover:bg-white p-6 rounded-lg transition-all duration-300"
      >
        <div className="flex space-x-4 items-center">
          <Avatar name="John Doe" size={32} />
          <div className="flex flex-col items-start">
            <p className="font-medium text-xs">John Doe</p>
            <p className="font-light text-n600 text-[10px]">
              johndoe@fekdi.com
            </p>
          </div>
        </div>
        <div className="p-1 bg-white border rounded-md border-n300">
          <CaretDownIcon size={12} color="black" />
        </div>
      </button>
    </div>
  );
}
