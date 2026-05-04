import { useSelector } from "react-redux";
import HeroBanner from "../components/HeroBanner";
import useTmdb from "../hooks/useTmdb";
import {
  addAiringTodayTvShows,
  addOnTheAirTvShows,
  addPopularTvShows,
  addTopRatedTvShows,
} from "../store/movieSlice";
import MovieList from "../components/MovieList";
import languageConstants from "../utils/languageConstants";
import LoadingScreen from "../components/LoadingScreen";

const Shows = () => {
  const shows = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];

  useTmdb(
    "tv/popular?page=1",
    addPopularTvShows,
    (store) => store.movies.popularTvShowsList,
  );

  useTmdb(
    "tv/top_rated?page=1",
    addTopRatedTvShows,
    (store) => store.movies.topRatedTvShowsList,
  );

  useTmdb(
    "tv/airing_today?page=1",
    addAiringTodayTvShows,
    (store) => store.movies.airingTodayTvShowsList,
  );

  useTmdb(
    "tv/on_the_air?page=1",
    addOnTheAirTvShows,
    (store) => store.movies.onTheAirTvShowsList,
  );

  const bannerMovie = shows.topRatedTvShows?.[0];

  if(!bannerMovie) return <LoadingScreen />

  return (
    <div className="relative bg-[#141414] text-white min-h-screen">
      <HeroBanner movie={bannerMovie} />

      <div className="px-6 md:px-16 -mt-32 relative z-10 py-8 flex flex-col">
        <MovieList title={text.popularShows} movies={shows.popularTvShows} />
        <MovieList title={text.topRatedShows} movies={shows.topRatedTvShows} />
        <MovieList
          title={text.airingToday}
          movies={shows.airingTodayTvShows}
        />
        <MovieList title={text.onTheAir} movies={shows.onTheAirTvShows} />
      </div>
    </div>
  );
};

export default Shows;
