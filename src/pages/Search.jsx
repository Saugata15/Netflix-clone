import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const langKey = useSelector((store) => store.language.currentLanguage);

  const text = languageConstants[langKey];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 lg:px-12 pt-28">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          {text.title}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          {text.subtitle}
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto">
        <form className="flex items-center bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 text-gray-400">
            <SearchIcon size={20} />
          </div>

          <input
            type="text"
            placeholder={text.placeholderText}
            className="w-full bg-transparent outline-none px-2 py-4 text-sm sm:text-base placeholder:text-gray-500"
          />

          <button className="bg-red-600 hover:bg-red-700 px-5 sm:px-7 py-4 font-medium transition-all duration-300">
            {text.search}
          </button>
        </form>
      </div>

      {/* Empty State */}
      <div className="max-w-3xl mx-auto mt-14 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          {text.emptyMessage}
        </p>
      </div>
    </div>
  );
};

export default Search;
