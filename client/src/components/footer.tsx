import { Link } from "@tanstack/react-router";
import { NavigationMenu, NavigationMenuLink } from "./ui/navigation-menu";

export default function Footer() {
  return (
    <footer className="container p-8 mx-auto max-w-7xl">
      <div className="flex flex-col gap-8 justify-between items-center py-8 border-b md:flex-row">
        <Link to="/">
          <img src="/flowspace-logo.png" alt="logo image" width="120" />
        </Link>
        <NavigationMenu>
          <NavigationMenuLink asChild>
            <Link to="/" hash="features">
              Features
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/" hash="pricing">
              Pricing
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/" hash="faqs">
              FAQs
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/" hash="contact">
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenu>
      </div>
      <div className="flex gap-8 justify-between items-center p-8 w-full">
        <p className="text-foreground/70">
          Copyright &copy; Flowspace {new Date().getFullYear()}
        </p>
        <p className="text-foreground/70">Bilel Hamitouche</p>
      </div>
    </footer>
  );
}
