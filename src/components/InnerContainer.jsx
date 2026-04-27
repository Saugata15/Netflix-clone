import React from 'react'
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const InnerContainer = () => {
    const movies = useSelector((store) => store.movies);
    console.log(movies);

  return (
    <div className="bg-black px-6 md:px-16 py-8 flex flex-col">
        <MovieList title="Now Playing" movies={movies.nowPlayingMoviesList} />
        <MovieList title="Popular Movies" movies={movies.popularMoviesList} />
        <MovieList title="Top Rated Movies" movies={movies.topRatedMoviesList} />
        <MovieList title="Upcoming Movies" movies={movies.upComingMoviesList} />
    </div>
  );
}

export default InnerContainer

