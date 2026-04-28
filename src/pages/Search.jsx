import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import MovieList from "../components/MovieList";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const langKey = useSelector((store) => store.language.currentLanguage);

  const handleSearch = async (searchText) => {
    if (!searchText.trim()) return;

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(searchText) +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS,
      );
      const data = await response.json();
      setMovies(data.results);
      setSearched(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      handleSearch(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const text = languageConstants[langKey];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 lg:px-12 pt-28">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{text.title}</h1>
        <p className="text-gray-400 text-sm sm:text-base">{text.subtitle}</p>
      </div>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto">
        <form
          className="flex items-center bg-[#1a1a1a] border border-gray-700 
          rounded-xl overflow-hidden shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
        >
          <div className="px-4 text-gray-400">
            <SearchIcon size={20} />
          </div>

          <input
            type="text"
            value={query}
            placeholder={text.placeholderText}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none px-2 py-4 text-sm 
            sm:text-base placeholder:text-gray-500"
          />

          <button
            className="bg-red-600 hover:bg-red-700 px-5 sm:px-7 
          py-4 font-medium transition-all duration-300"
          >
            {text.search}
          </button>
        </form>
      </div>

      <div className="mt-10 text-center">
        {!searched ? (
          <div className="max-w-3xl mx-auto text-gray-500">
            <p>{text.emptyMessage}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="max-w-3xl mx-auto text-gray-400">
            <p>{text.noResults(query)}</p>
          </div>
        ) : (
          <MovieList title={text.searchSuccess} movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Search;
