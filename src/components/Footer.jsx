import React from "react";
import { useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";

const Footer = () => {
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];

  const footerLinks = [
    text.faq,
    text.helpCenter,
    text.account,
    text.mediaCenter,
    text.privacy,
    text.contactUs,
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-[#111] text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10">
        {/* Top Text */}
        <p className="text-sm md:text-base mb-8 text-gray-300">
          {text.questions}
        </p>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 text-sm">
          {footerLinks.map((item) => (
            <button
              key={item}
              className="text-left hover:text-white hover:underline transition duration-300"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-gray-500 font-medium tracking-wide">
            {text.footerTitle}
          </p>

          <p className="text-gray-600 text-center sm:text-right">
            {text.footerSubtitle}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;