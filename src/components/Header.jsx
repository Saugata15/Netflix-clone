import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfigue";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../store/languageSlice";
import languageConstants from "../utils/languageConstants";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [showBg, setShowBg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentLanguage = useSelector(
    (store) => store.language.currentLanguage,
  );

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const text = languageConstants[currentLanguage];

  const navItems = [
    { path: "/browse", label: text.home },
    { path: "/shows", label: text.shows },
    { path: "/movies", label: text.movies },
    { path: "/new-popular", label: text.newPopular },
    { path: "/my-list", label: text.myList },
  ];

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

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setShowBg(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `font-semibold hover:text-white transition ${
      isActive ? "text-white" : "text-[#e5e5e5]"
    }`;

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`flex justify-between items-center px-3 sm:px-5 lg:px-12 py-2 
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${showBg ? "bg-[#0d0d0d]" : "bg-transparent"}`}
      >
        {/* LEFT */}
        <div className="flex items-center lg:text-sm sm:text-sm gap-2 lg:gap-6">
          <img
            src={assets.Logo}
            alt="logo"
            onClick={() => navigate("/browse")}
            className="md:w-32 sm:w-28 w-24 cursor-pointer"
          />

          {!isLoginPage && (
            <nav className="hidden md:flex items-center lg:gap-5 gap-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>

        {/* RIGHT */}
        {!isLoginPage && (
          <div className="flex items-center gap-4 max-sm:gap-3">
            {/* Language */}
            <div className="relative">
              <select
                className="appearance-none bg-[#1a1a1a] border border-gray-600 text-white py-2
                text-sm font-semibold max-md:font-medium rounded-md pl-4 max-sm:pl-3 pr-7 cursor-pointer"
                onChange={handleLanguage}
                value={currentLanguage}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-300">
                ▼
              </span>
            </div>

            {/* Search */}
            <NavLink to="/search">
              <img
                src={assets.search}
                alt="search-icon"
                className="cursor-pointer w-4"
              />
            </NavLink>

            {/* PROFILE */}
            <div className="relative group">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <img
                  src={assets.userIcon}
                  alt="user-icon"
                  className="w-8 max-sm:w-7 rounded"
                />
                <img
                  src={assets.caret}
                  alt="arrow-down"
                  className={`w-3 transition-transform duration-300 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* MOBILE (CLICK) */}
              <div
                className={`absolute top-full right-0 mt-3 bg-black/70 border border-gray-700 rounded-md py-2 px-4 transition-all duration-300 md:hidden
                ${
                  isProfileOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
              >
                <button
                  onClick={handleSignOut}
                  className="text-sm text-white hover:underline whitespace-nowrap"
                >
                  {text.signOutNetflix}
                </button>
              </div>

              {/* DESKTOP (HOVER) */}
              <div className="hidden md:block">
                <div
                  className="absolute top-full right-0 mt-3 bg-black/70 border border-gray-700 rounded-md py-2 px-4
                  opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-300"
                >
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-white hover:underline whitespace-nowrap"
                  >
                    {text.signOutNetflix}
                  </button>
                </div>
              </div>
            </div>

            {/* HAMBURGER */}
            <Menu
              size={20}
              color="#fff"
              className="md:hidden"
              onClick={handleMobileMenu}
            />
          </div>
        )}
      </header>

      {/* OVERLAY */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] z-50 transform transition-transform duration-300
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-white font-semibold">Menu</span>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={22} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-white">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
