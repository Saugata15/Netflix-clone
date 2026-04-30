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

const Browse = () => {
  useTmdb("movie/now_playing?page=1", addNowPlayingMovies);
  useTmdb("movie/popular?page=1", addPopularMovies);
  useTmdb("movie/top_rated?page=1", addTopRatedMovies);
  useTmdb("movie/upcoming?page=1", addUpComingMovies);
  useTmdb("discover/movie?with_genres=28", addActionMovies);
  useTmdb("discover/movie?with_genres=35", addComedyMovies);

  useTmdb("tv/popular?page=1", addPopularTvShows);
  useTmdb("tv/top_rated?page=1", addTopRatedTvShows);
  useTmdb("tv/airing_today?page=1", addAiringTodayTvShows);
  useTmdb("tv/on_the_air?page=1", addOnTheAirTvShows);

  return (
    <div className="text-white">
      <MainContainer />
      <InnerContainer />
    </div>
  );
};

export default Browse;
