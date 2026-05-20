import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Link } from "@tanstack/react-router";

export default function MobileMenu() {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="subtle" size="icon-lg">
          <Menu size={40} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        <DrawerClose className="mt-4 mr-4 ml-auto" asChild>
          <Button variant="subtle" size="icon">
            <X />
          </Button>
        </DrawerClose>
        <nav className="flex flex-col gap-1 p-8 pt-2 w-full">
          <Button variant="ghost" asChild>
            <Link to="/" hash="features">
              Features
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/" hash="pricing">
              Pricing
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/" hash="faqs">
              FAQs
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/" hash="contact">
              Contact
            </Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Register</Link>
          </Button>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
