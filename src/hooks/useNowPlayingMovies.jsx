import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.nowPlayingMoviesList);

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS,
      );
      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!movies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
