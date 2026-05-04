import { useSelector } from "react-redux";
import InnerContainer from "../components/InnerContainer";
import MainContainer from "../components/MainContainer";
import useTmdb from "../hooks/usetmdb";
import {
  addActionMovies,
  addAiringTodayTvShows,
  addComedyMovies,
  addNowPlayingMovies,
  addOnTheAirTvShows,
  addPopularMovies,
  addPopularTvShows,
  addTopRatedMovies,
  addTopRatedTvShows,
  addUpComingMovies,
} from "../store/movieSlice";
import LoadingScreen from "../components/LoadingScreen";

const Browse = () => {
  const store = useSelector((store) => store.movies);

  useTmdb(
    "movie/now_playing?page=1",
    addNowPlayingMovies,
    (store) => store.movies.nowPlayingMoviesList
  );

  useTmdb(
    "movie/popular?page=1",
    addPopularMovies,
    (store) => store.movies.popularMoviesList
  );

  useTmdb(
    "movie/top_rated?page=1",
    addTopRatedMovies,
    (store) => store.movies.topRatedMoviesList
  );

  useTmdb(
    "movie/upcoming?page=1",
    addUpComingMovies,
    (store) => store.movies.upComingMoviesList
  );

  useTmdb(
    "discover/movie?with_genres=28",
    addActionMovies,
    (store) => store.movies.actionMoviesList
  );

  useTmdb(
    "discover/movie?with_genres=35",
    addComedyMovies,
    (store) => store.movies.comedyMoviesList
  );

  useTmdb(
    "tv/popular?page=1",
    addPopularTvShows,
    (store) => store.movies.popularTvShowsList
  );

  useTmdb(
    "tv/top_rated?page=1",
    addTopRatedTvShows,
    (store) => store.movies.topRatedTvShowsList
  );

  useTmdb(
    "tv/airing_today?page=1",
    addAiringTodayTvShows,
    (store) => store.movies.airingTodayTvShowsList
  );

  useTmdb(
    "tv/on_the_air?page=1",
    addOnTheAirTvShows,
    (store) => store.movies.onTheAirTvShowsList
  );

  if (!store.nowPlayingMoviesList?.length) {
    return <LoadingScreen />;
  }

  return (
    <div className="text-white">
      <MainContainer />
      <InnerContainer />
    </div>
  );
};

export default Browse;