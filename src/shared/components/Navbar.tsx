'use client'

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [currentSection, setCurrentSection] = useState("HOME");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef<HTMLLIElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // 🔹 NEW
  const pathname = usePathname();
  const router = useRouter(); 

  const menuItems = ["HOME", "FEATURES", "WHY QVISION?", "ABOUT US"];

  const scrollToSection = (item: string) => {
    const id = item.toLowerCase().replace(/\s+/g, "-").replace("?", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (pathname === "/shop") {
      setCurrentSection("SHOP");
    } else if (pathname === "/") {
      setCurrentSection("HOME");
    }
    setLoading(false); // 🔹 Stop loader once route changes
  }, [pathname]);

  // underline effect
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

  // scroll listener with IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return; // ✅ Only run this logic on home page

    const sectionIds = menuItems.map((item) =>
      item.toLowerCase().replace(/\s+/g, "-").replace("?", "")
    );

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const matchedItem = menuItems.find(
                  (i) =>
                    i.toLowerCase().replace(/\s+/g, "-").replace("?", "") === id
                );
                if (matchedItem) setCurrentSection(matchedItem);
              }
            });
          },
          { threshold: 0.6 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  // 🔹 Custom route change handler with loader
  const handleRouteChange = (path: string) => {
    setLoading(true);
    router.replace(path);
  };

  return (
    <nav className="w-full z-40 sticky top-0 bg-white py-4 px-6 md:px-16 shadow-sm flex justify-between items-center relative">
      {/* Loader bar at top */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#23488B] animate-pulse"></div>
      )}

      <div className="flex items-center space-x-4">
        <Image 
          onClick={() => pathname === '/shop' && handleRouteChange('/')} 
          className={`${pathname === '/shop' && 'cursor-pointer'}`} 
          src="/assets/Logo.png" 
          alt="Logo" 
          width={78} 
          height={78} 
        />
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
        {pathname === "/" ? (
          menuItems.map((item, idx) => (
            <li
              key={item}
              ref={(el) => {
                if (el) menuRefs.current[idx] = el;
              }}
              onClick={() => {
                setCurrentSection(item);
                scrollToSection(item);
              }}
              className={`relative hover:text-[#23488B] cursor-pointer text-sm ${
                currentSection === item ? "text-[#23488B]" : ""
              }`}
            >
              {item}
            </li>
          ))
        ) : (
          <li
            ref={(el) => {
              if (el) menuRefs.current[0] = el;
            }}
            onClick={() => handleRouteChange('/shop')}
            className={`relative hover:text-[#23488B] cursor-pointer text-sm ${
              currentSection === "SHOP" ? "text-[#23488B]" : ""
            }`}
          >
            SHOP
          </li>
        )}

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
           {pathname === "/" ? (
              menuItems.map((item, idx) => (
                <li
                  key={item}
                  ref={(el) => {
                    if (el) menuRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    setCurrentSection(item);
                    scrollToSection(item);
                    setIsOpen(false);
                  }}
                  className={`relative hover:text-[#23488B] cursor-pointer text-sm ${
                    currentSection === item ? "text-[#23488B]" : ""
                  }`}
                >
                  {item}
                </li>
              ))
            ) : (
              <li
                ref={(el) => {
                  if (el) menuRefs.current[0] = el;
                }}
                onClick={() => {
                  handleRouteChange('/shop');
                  setIsOpen(false);
                }}
                className={`relative hover:text-[#23488B] cursor-pointer text-sm ${
                  currentSection === "SHOP" ? "text-[#23488B]" : ""
                }`}
              >
                SHOP
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

