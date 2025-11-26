"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const MENU_ITEMS = ["HOME", "FEATURES", "WHY QVISION?", "ABOUT US"];

export default function Navbar() {
  const [current, setCurrent] = useState("HOME");
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const menuRefs = useRef<HTMLLIElement[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (item: string) => {
    const id = item.toLowerCase().replace(/\s+/g, "-").replace("?", "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goTo = (item: string) => {
    if (pathname !== "/") {
      router.replace("/");
      return;
    }

    setIsManualScrolling(true);
    setCurrent(item);
    scrollToSection(item);

    setTimeout(() => {
      setIsManualScrolling(false);
    }, 900);
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = MENU_ITEMS.map((item) =>
      item.toLowerCase().replace(/\s+/g, "-").replace("?", "")
    );

    const observers: IntersectionObserver[] = [];

    ids.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!isManualScrolling && entries[0].isIntersecting) {
            setCurrent(MENU_ITEMS[idx]);
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname, isManualScrolling]);

  useEffect(() => {
    const update = () => {
      let el: HTMLLIElement | undefined;

      if (pathname === "/") {
        el = menuRefs.current[MENU_ITEMS.indexOf(current)];
      } else {
        el = menuRefs.current[0];
      }

      if (el) {
        setUnderline({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(update);
    });

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [current, pathname]);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white py-6 px-6 md:px-16 shadow-sm z-50 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Image
          onClick={() => pathname === "/shop" && router.replace("/")}
          className={pathname === "/shop" ? "cursor-pointer" : ""}
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

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-12 items-center font-semibold text-[#787878] relative">
        {pathname === "/" ? (
          MENU_ITEMS.map((item, idx) => (
            <li
              key={item}
              ref={(el: any) => (menuRefs.current[idx] = el!)}
              onClick={() => goTo(item)}
              className={`cursor-pointer text-sm hover:text-[#23488B] ${
                current === item ? "text-[#23488B]" : ""
              }`}
            >
              {item}
            </li>
          ))
        ) : (
          <li
            ref={(el: any) => (menuRefs.current[0] = el!)}
            onClick={() => router.replace("/shop")}
            className={`cursor-pointer text-sm hover:text-[#23488B] ${
              current === "SHOP" ? "text-[#23488B]" : ""
            }`}
          >
            SHOP
          </li>
        )}

        {/* underline */}
        <div
          className="absolute mt-[4.5rem] h-[3.5px] bg-[#23488B] transition-[left,width] duration-300 ease-out"
          style={{
            left: underline.left,
            width: underline.width,
          }}
        />
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col space-y-4 py-6 font-semibold text-[#787878] items-center">
            {pathname === "/" ? (
              MENU_ITEMS.map((item, idx) => (
                <li
                  key={item}
                  ref={(el: any) => (menuRefs.current[idx] = el!)}
                  onClick={() => {
                    goTo(item);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer text-sm hover:text-[#23488B] ${
                    current === item ? "text-[#23488B]" : ""
                  }`}
                >
                  {item}
                </li>
              ))
            ) : (
              <li
                ref={(el: any) => (menuRefs.current[0] = el!)}
                onClick={() => {
                  router.replace("/shop");
                  setIsOpen(false);
                }}
                className={`cursor-pointer text-sm hover:text-[#23488B] ${
                  current === "SHOP" ? "text-[#23488B]" : ""
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
}

