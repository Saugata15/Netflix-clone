import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpComingMovies } from "../store/movieSlice";

const useUpComingMovies = () => {
  const dispatch = useDispatch();
  const UpComingMovies = useSelector((store) => store.movies?.upComingMoviesList);

  const getUpComingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS,
      );
      const data = await response.json();
      dispatch(addUpComingMovies(data.results));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!UpComingMovies) getUpComingMovies();
  }, [UpComingMovies]);
}

export default useUpComingMovies