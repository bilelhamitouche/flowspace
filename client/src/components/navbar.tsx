import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuLink } from "./ui/navigation-menu";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  return (
    <header className="container flex justify-between items-center p-4 mx-auto max-w-7xl">
      <h1 className="text-2xl font-medium">Flowspace</h1>
      <NavigationMenu className="hidden gap-2 font-medium md:flex">
        <NavigationMenuLink className="py-2.5" asChild>
          <Link to="/" hash="features">
            Features
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink className="py-2.5" asChild>
          <Link to="/" hash="pricing">
            Pricing
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink className="py-2.5" asChild>
          <Link to="/" hash="contact">
            Contact
          </Link>
        </NavigationMenuLink>
      </NavigationMenu>
      <div className="hidden gap-4 md:flex">
        <Button asChild>
          <Link to="/auth/register">Register</Link>
        </Button>
      </div>
      <div className="flex gap-4 md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}
