import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS,
      );
      const data = await response.json();

      const filterData = data?.results?.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      const trailer = filterData[0] || data.results[0];

      dispatch(addTrailerVideo(trailer?.key));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (movieId) getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
