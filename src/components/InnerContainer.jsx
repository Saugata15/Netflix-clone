import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import languageConstants from "../utils/languageConstants";

const InnerContainer = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];

  return (
    <div className="bg-[#141414] px-6 md:px-16 py-8 flex flex-col">
      <MovieList title={text.trending} movies={movies.nowPlayingMoviesList} />
      <MovieList title={text.popular} movies={movies.popularMoviesList} />
      <MovieList title={text.topRated} movies={movies.topRatedMoviesList} />
      <MovieList title={text.action} movies={movies.actionMoviesList} />
      <MovieList title={text.comedy} movies={movies.comedyMoviesList} />
      <MovieList title={text.upcoming} movies={movies.upComingMoviesList} />
      <MovieList title={text.popularShows} movies={movies.popularTvShows} />
      <MovieList title={text.topRatedShows} movies={movies.topRatedTvShows} />
      <MovieList title={text.airingToday} movies={movies.airingTodayTvShows} />
      <MovieList title={text.onTheAir} movies={movies.onTheAirTvShows} />
    </div>
  );
};

export default InnerContainer;
