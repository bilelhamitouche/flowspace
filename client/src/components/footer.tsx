import { Link } from "@tanstack/react-router";
import Logo from "./logo";
import {
  FaLinkedinIn,
  FaSquareFacebook,
  FaSquareXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="container p-8 mx-auto max-w-7xl">
      <div className="flex flex-col gap-8 justify-around items-start py-8 md:flex-row">
        <Logo />
        <div className="space-y-4">
          <h4 className="text-xl font-medium font-heading">Links</h4>
          <nav className="flex flex-col gap-2 text-foreground/70">
            <Link to="/" hash="features">
              Features
            </Link>
            <Link to="/" hash="faqs">
              FAQs
            </Link>
            <Link to="/" hash="learn">
              Learn
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-medium font-heading">Company</h4>
          <nav className="flex flex-col gap-2 text-foreground/70">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-medium font-heading">Legal</h4>
          <nav className="flex flex-col gap-2 text-foreground/70">
            <Link to="/legal/terms">Terms of service</Link>
            <Link to="/legal/privacy">Privacy Policy</Link>
          </nav>
        </div>
        <div className="space-y-8">
          <h4 className="font-medium">Follow us on</h4>
          <div className="flex gap-4 items-center">
            <a href="twitter.com/flowspace">
              <FaSquareXTwitter className="opacity-70 transition-colors hover:opacity-100 size-6" />
            </a>
            <a href="facebook.com/flowspace">
              <FaSquareFacebook className="opacity-70 transition-colors hover:opacity-100 size-6" />
            </a>
            <a href="facebook.com/flowspace">
              <FaLinkedinIn className="opacity-70 transition-colors hover:opacity-100 size-6" />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-8 pb-0 text-center text-foreground/70">
        <p>&copy;Flowspace {new Date().getFullYear()}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
