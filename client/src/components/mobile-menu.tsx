import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Link } from "@tanstack/react-router";

export default function MobileMenu() {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button className="md:hidden" variant="ghost">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-8">
        <DrawerClose asChild>
          <Button variant="ghost" className="ml-auto w-fit">
            <X />
          </Button>
        </DrawerClose>
        <nav className="flex flex-col gap-2 items-center w-full text-lg">
          <Link
            to="/"
            hash="features"
            className="p-2 w-full text-center transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            to="/"
            hash="faqs"
            className="p-2 w-full text-center transition-colors hover:text-primary"
          >
            FAQs
          </Link>
          <Link
            to="/"
            hash="pricing"
            className="p-2 w-full text-center transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            to="/"
            hash="learn"
            className="p-2 w-full text-center transition-colors hover:text-primary"
          >
            Learn
          </Link>
          <Button size="xl" className="w-full rounded-full">
            <Link to="/auth/register">Register</Link>
          </Button>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
