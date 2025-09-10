'use client'

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [currentSection, setCurrentSection] = useState("HOME");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef<HTMLLIElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["HOME", "FEATURES", "WHY QVISION?", "ABOUT US"];

  const scrollToSection = (item: string) => {
    // normalize id from item name (lowercase, remove spaces and ?)
    const id = item.toLowerCase().replace(/\s+/g, "-").replace("?", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const updateUnderline = () => {
      const index = menuItems.indexOf(currentSection);
      const el = menuRefs.current[index];

      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) {
          setUnderlineStyle({
            left: el.offsetLeft,
            width: rect.width,
          });
        }
      }
    };

    requestAnimationFrame(updateUnderline);

    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [currentSection, menuItems]);


  return (
    <nav className="w-full sticky top-0 bg-white py-4 px-6 md:px-16 shadow-sm flex justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <Image src="/assets/Logo.png" alt="Logo" width={78} height={78} />
        <div className="w-px h-6 bg-gray-400 hidden md:block"></div>
        <Image
          src="/assets/byteq-logo.png"
          alt="Byteq"
          width={55}
          height={55}
          className="hidden md:block"
        />
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-12 items-center text-[#787878] font-semibold relative">
        {menuItems.map((item, idx) => (
          <li
            key={item}
            ref={(el) => {
              if (el) menuRefs.current[idx] = el;
            }}
            onClick={() => {
              setCurrentSection(item);
              scrollToSection(item);
            }}
            className="relative hover:text-[#23488B] cursor-pointer text-sm"
          >
            {item}
          </li>
        ))}

        <div
          className="absolute mt-[3.5rem] h-[3.5px] bg-[#23488B] transition-all duration-300"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col items-center space-y-4 py-6 text-[#787878] font-semibold">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setCurrentSection(item);
                  scrollToSection(item);
                  setIsOpen(false); 
                }}
                className={`hover:text-[#23488B] cursor-pointer text-base ${
                  currentSection === item ? "text-[#23488B]" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

