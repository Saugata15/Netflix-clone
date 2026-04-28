import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfigue";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../store/LanguageSlice";
import languageConstants from "../utils/languageConstants";

const Header = () => {
  const [showBg, setShowBg] = useState(false);
  const currentLanguage = useSelector(
    (store) => store.language.currentLanguage,
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const text = languageConstants[currentLanguage];

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

  const handleSearch = () => {
    navigate("/search");
  };

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

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
            <NavLink to={"/browse"} className={navLinkClass}>
              {text.home}
            </NavLink>
            <NavLink to={"/shows"} className={navLinkClass}>
              {text.shows}
            </NavLink>
            <NavLink to={"/movies"} className={navLinkClass}>
              {text.movies}
            </NavLink>
            <NavLink to={"/new&popular"} className={navLinkClass}>
              {text.newPopular}
            </NavLink>
            <NavLink to={"/mylist"} className={navLinkClass}>
              {text.myList}
            </NavLink>
          </nav>
        )}
      </div>

      {!isLoginPage && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-[#1a1a1a] border border-gray-600 text-white 
            text-sm font-semibold rounded-md pl-4 pr-7 py-2 cursor-pointer
            outline-none hover:border-gray-400 transition-all duration-300"
              onChange={handleLanguage}
              value={currentLanguage}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="bg-[#1a1a1a] text-white"
                >
                  {lang.name}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <span
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 
              text-xs text-gray-300"
            >
              ▼
            </span>
          </div>

          <img
            src={assets.search}
            alt="search-icon"
            className="cursor-pointer w-4"
            onClick={handleSearch}
          />

          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={assets.userIcon}
                alt="user-icon"
                className="w-8 rounded"
              />
              <img
                src={assets.caret}
                alt="arrow-down"
                className="w-3 transition-transform duration-300 group-hover:rotate-180"
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
                {text.signOutNetflix}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
