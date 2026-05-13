import MovieList from "../components/MovieList";
import {
  addActionMovies,
  addComedyMovies,
  addTopRatedMovies,
  addNowPlayingMovies,
  addPopularMovies,
  addUpComingMovies,
} from "../store/movieSlice";
import useTmdb from "../hooks/useTmdb";
import { useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";
import HeroBanner from "../components/HeroBanner";
import LoadingScreen from "../components/LoadingScreen";

const Movies = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];

  useTmdb(
    "movie/now_playing?page=1",
    addNowPlayingMovies,
    (store) => store.movies.nowPlayingMoviesList,
  );

  useTmdb(
    "movie/popular?page=1",
    addPopularMovies,
    (store) => store.movies.popularMoviesList,
  );

  useTmdb(
    "movie/top_rated?page=1",
    addTopRatedMovies,
    (store) => store.movies.topRatedMoviesList,
  );

  useTmdb(
    "movie/upcoming?page=1",
    addUpComingMovies,
    (store) => store.movies.upComingMoviesList,
  );

  useTmdb(
    "discover/movie?with_genres=28",
    addActionMovies,
    (store) => store.movies.actionMoviesList,
  );

  useTmdb(
    "discover/movie?with_genres=35",
    addComedyMovies,
    (store) => store.movies.comedyMoviesList,
  );

  const bannerMovie = movies.topRatedMoviesList?.[0];

  if(!bannerMovie) return <LoadingScreen />

  return (
  <div className="bg-[#141414] text-white min-h-screen">

    <HeroBanner movie={bannerMovie} />

    <div className="px-6 md:px-16 -mt-32 relative z-10 py-8 flex flex-col">
      <MovieList title={text.trending} movies={movies.nowPlayingMoviesList} />
      <MovieList title={text.popular} movies={movies.popularMoviesList} />
      <MovieList title={text.topRated} movies={movies.topRatedMoviesList} />
      <MovieList title={text.action} movies={movies.actionMoviesList} />
      <MovieList title={text.comedy} movies={movies.comedyMoviesList} />
      <MovieList title={text.upcoming} movies={movies.upComingMoviesList} />
    </div>

  </div>
);
};

export default Movies;
