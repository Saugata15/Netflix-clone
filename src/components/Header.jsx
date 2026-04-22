import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `font-semibold text-[#e5e5e5] hover:text-white transition
    ${isActive ? "text-white" : "text-[#e5e5e5] hover:text-white"}`;

  return (
    <header
      className={`flex justify-between items-center px-4 sm:px-5 lg:px-12 py-2 
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${showBg ? "bg-[#0d0d0d]" : "bg-transparent"}`}
    >
      <div className="flex items-center lg:text-sm sm:text-xs gap-2 lg:gap-6">
        <img
          src={assets.Logo}
          alt="logo"
          className="lg:w-32 md:w-28 w-24 cursor-pointer"
        />

        <nav className="flex items-center lg:gap-5 gap-3 max-md:hidden">
          <NavLink to={"/"} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to={"/shows"} className={navLinkClass}>
            Shows
          </NavLink>
          <NavLink to={"/movies"} className={navLinkClass}>
            Movies
          </NavLink>
          <NavLink to={"/games"} className={navLinkClass}>
            Games
          </NavLink>
          <NavLink to={"/new&popular"} className={navLinkClass}>
            New & Popular
          </NavLink>
          <NavLink to={"/mylist"} className={navLinkClass}>
            My List
          </NavLink>
          <NavLink to={"/browsebylanguages"} className={navLinkClass}>
            Browse by Languages
          </NavLink>
        </nav>
      </div>
      
      <div className="flex items-center">
        <img
          src={assets.search}
          alt="search-icon"
          className="cursor-pointer w-4"
        />
      </div>
    </header>
  );
};

export default Header;
