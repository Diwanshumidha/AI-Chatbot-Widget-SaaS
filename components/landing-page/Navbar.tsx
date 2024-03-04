"use client";

import { NavigationMenuItems } from "./navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileSheet } from "./sheet-mobile-navigation";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaSignInAlt } from "react-icons/fa";
import { TbLogin } from "react-icons/tb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarComponent } from "./Avatar";
import TokenCount from "@/components/token-count";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BiChevronDown } from "react-icons/bi";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname()
  const { data: session } = useSession();
  console.log("session in navbar", session);
  return (
    <nav className={`w-full h-20 fixed top-0 z-[500] border-b bg-white`}>
      <div className="max-w-7xl h-full items-center mx-auto px-6 justify-between md:flex hidden">
        <Link href="/" className="flex space-x-3 items-center">
          <IoChatboxEllipsesOutline size={30} />
          <h2 className="text-2xl font-extrabold">Chatty AI</h2>
        </Link>
        <NavigationMenuItems />
        {!session ? (
          <div className="flex flex-row gap-4 items-center">
            <Link
              className={cn("flex gap-x-2", buttonVariants())}
              href="/auth/register"
            >
              Sign Up <TbLogin />
            </Link>

            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex gap-x-2"
              )}
              href="/auth/login"
            >
              Login <FaSignInAlt />
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4 h-full">
            {/* <TokenCount />
            <Separator className="h-1/2 my-auto w-0.5" orientation="vertical" /> */}

            <Menubar className="z-[150] p-0 rounded-full bg-transparent border-none">
              <MenubarMenu>
                <MenubarTrigger className="focus:bg-transparent p-0 bg-transparent data-[state=open]:bg-transparent space-x-2 cursor-pointer ">
                  <AvatarComponent />
                  <p className="font-semibold text-sm">{session?.user.name}</p>
                  <BiChevronDown />
                </MenubarTrigger>
                <MenubarContent className="mt-5">
                  <MenubarItem className="cursor-pointer">Dashboard</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="cursor-pointer">Your Assistant</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="cursor-pointer">Account Settings</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="cursor-pointer" onClick={() => signOut()}>Logout</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        )}
      </div>
      <div className="flex md:hidden h-full items-center justify-between px-8">
        <Link href="/" className="flex space-x-3 items-center">
          <IoChatboxEllipsesOutline size={30} />
          <h2 className="text-2xl font-extrabold">Chatty</h2>
        </Link>
        <MobileSheet />
      </div>
    </nav>
  );
};

export default Navbar;
