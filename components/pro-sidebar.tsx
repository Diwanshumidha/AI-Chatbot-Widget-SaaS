"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMessageChatbot } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import TokenCount from "./token-count";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineDashboard className="text-black" />,
  },
  {
    name: "Create assistant",
    path: "/dashboard/create-chatbot",
    icon: <TbMessageChatbot className="text-black" />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <CiSettings className="text-black" />,
  },
];

const ProSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(false);
  const pathname = usePathname();
  return (
    <div className="flex flex-col sticky top-20 justify-between h-[90vh]">
      <Sidebar
        className="min-h-full z-50"
        collapsed={collapsed}
        toggled={toggled}
      >
        <Menu>
          <div>
            {routes.map((route) => (
              <SubMenu
                key={route.path}
                className={`${
                  pathname === route.path ? "bg-gray-100 " : "text-black"
                } text-transparent`}
                label={route.name}
                icon={route.icon}
              >
                <MenuItem className="text-black" component={<Link href={route.path} />}>
                  {route.name}{" "}
                </MenuItem>
              </SubMenu>
            ))}
          </div>
        </Menu>
      </Sidebar>
      <div>{/* <TokenCount /> */}</div>
    </div>
  );
};

export default ProSidebar;
