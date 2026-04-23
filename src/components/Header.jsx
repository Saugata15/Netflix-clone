import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfigue";

const Header = () => {
  const [showBg, setShowBg] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

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
    `font-semibold hover:text-white transition
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
          onClick={() => navigate("/browse")}
          className="lg:w-32 md:w-28 w-24 cursor-pointer"
        />

        {!isLoginPage && (
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
        )}
      </div>

      {!isLoginPage && (
        <div className="flex items-center gap-4">
          <img
            src={assets.search}
            alt="search-icon"
            className="cursor-pointer w-4"
          />
          <div className="relative group">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <img
                src={assets.userIcon}
                alt="user-icon"
                className="w-8 rounded"
              />
              <img
                src={assets.caret}
                alt="arrow-down"
                className="w-2.5 transition-transform duration-300 group-hover:rotate-180"
              />
            </div>
            <div className="absolute top-full right-0 h-3 w-full"></div>
            <div
              className="absolute min-w-max top-full right-0 mt-3 bg-black/70 border
          border-gray-700 rounded-md py-2 px-4 translate-y-2 opacity-0 invisible
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          transition-all duration-300"
            >
              <button
                onClick={handleSignOut}
                className="text-sm text-white hover:underline whitespace-nowrap cursor-pointer"
              >
                Sign out of Netflix
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
