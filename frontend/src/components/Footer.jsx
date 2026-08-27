import dwellioLogo from "../assets/logos/dwellioLogo.png";
import { ArrowRight } from "lucide-react";

import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mx-20 mt-10 py-5">
      <div className="flex justify-between gap-8">
        
        {/* Left */}
        <div className="max-w-55">
          <Link to="/">
            <img
              src={dwellioLogo}
              alt="Dwellio"
              className="h-8 w-auto"
            />
          </Link>

          <p className="mt-3 text-sm text-slate-500">
            Data-driven locality intelligence
            <br />
            for smarter home decisions.
          </p>

          <div className="mt-4 flex gap-3">
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
            <FaYoutube />
          </div>

          <p className="mt-5 text-xs text-slate-500">
            © 2025 Dwellio. All rights reserved.
          </p>
        </div>

        {/* Product */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-slate-800">Product</h3>

          <div className="flex flex-col gap-1 text-sm text-slate-500">
            <Link to="/explore">Explore Localities</Link>
            <Link to="/compare">Compare Localities</Link>
            <Link to="/quiz">Find My Locality</Link>
            <Link to="#">Saved Localities</Link>
          </div>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-slate-800">Resources</h3>

          <div className="flex flex-col gap-1 text-sm text-slate-500">
            <Link to="#">Blog</Link>
            <Link to="#">Methodology</Link>
            <Link to="#">Data Sources</Link>
            <Link to="#">Help Center</Link>
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-slate-800">Company</h3>

          <div className="flex flex-col gap-1 text-sm text-slate-500">
            <Link to="#">About Us</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Contact Us</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-65">
          <h3 className="font-bold text-slate-800">Newsletter</h3>

          <p className="mt-2 text-sm text-slate-500">
            Stay updated with the latest insights and new localities.
          </p>

          <div className="mt-3 flex overflow-hidden rounded-lg border border-slate-200">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm outline-none"
            />

            <button className="flex w-11 shrink-0 items-center justify-center bg-blue-600 text-white">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;