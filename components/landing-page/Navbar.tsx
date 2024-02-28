import Image from "next/image";
import { NavigationMenuItems } from "./navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileSheet } from "./sheet-mobile-navigation";

const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-slate-100 fixed top-0 z-[100]">
      <div className="max-w-7xl h-full items-center mx-auto px-6 justify-between md:flex hidden">
        <Link href="/">
          <Image
            src="/chatty-logo.png"
            alt="Chatty Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </Link>

        <NavigationMenuItems />
        <Button>
          <Link href="/auth/register">Sign Up</Link>
        </Button>
      </div>
      <div className="flex md:hidden h-full items-center justify-between px-8">
        <Link href="/">
          <Image
            src="/chatty-logo.png"
            alt="Chatty Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <MobileSheet />
      </div>
    </nav>
  );
};

export default Navbar;
