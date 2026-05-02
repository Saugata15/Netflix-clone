import { API_OPTIONS } from "./constants";

export const searchMovieTMDB = async (movieName) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(movieName),
    API_OPTIONS
  );

  const data = await res.json();
  return data.results;
};