import { API_OPTIONS } from "./constants";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovieTMDB = async (movieName) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movieName
    )}&api_key=${API_KEY}`,
    API_OPTIONS
  );

  if (!res.ok) {
    throw new Error(`Search API failed: ${res.status}`);
  }
  
  const data = await res.json();
  return data.results;
};