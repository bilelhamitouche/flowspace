import { Link } from "@tanstack/react-router";
import Logo from "./logo";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  return (
    <header className="container flex gap-14 justify-between items-center p-4 mx-auto max-w-7xl">
      <Logo />
      <nav className="hidden gap-8 items-center mr-auto md:flex">
        <Link
          to="/"
          hash="features"
          className="transition-colors text-md hover:text-primary"
        >
          Features
        </Link>
        <Link
          to="/"
          hash="pricing"
          className="transition-colors text-md hover:text-primary"
        >
          Pricing
        </Link>
        <Link
          to="/"
          hash="faq"
          className="transition-colors text-md hover:text-primary"
        >
          FAQ
        </Link>
        <Link
          to="/"
          hash="about"
          className="transition-colors text-md hover:text-primary"
        >
          Learn
        </Link>
      </nav>
      <Button
        size="xl"
        className="hidden px-10 rounded-full md:flex"
        children={<Link to="/auth/register">Register</Link>}
      />
      <MobileMenu />
    </header>
  );
}
