import { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/images/logo_wisata_desa_bentek.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "Explore", to: "explore" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav className="bg-[#1c4444] fixed w-full shadow-sm rounded-b-[20px] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* === Logo === */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="MyBrand Logo"
            className="h-10 w-auto scale-125 md:scale-150 origin-left cursor-pointer transition-transform duration-300 hover:scale-[1.6]"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>

        {/* === Menu Desktop === */}
        <div className="hidden md:flex space-x-8 text-white">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={600}
              offset={-80}
              spy={true}
              activeClass="text-yellow-300 font-semibold"
              className="cursor-pointer hover:text-yellow-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* === Tombol Toggle Mobile === */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* === Menu Mobile === */}
      {open && (
        <div className="md:hidden bg-[#1c4444] shadow-md text-white rounded-b-[20px]">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={600}
              offset={-80}
              spy={true}
              activeClass="bg-[#255b5b] text-yellow-300 font-medium"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-[#255b5b] cursor-pointer transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
