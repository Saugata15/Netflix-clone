import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;
    dispatch(addTrailerVideo(null));

    const controller = new AbortController();

    const getMovieVideos = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`,
          {
            ...API_OPTIONS,
            signal: controller.signal,
          }
        );
        const data = await response.json();

        const trailer = data?.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        dispatch(addTrailerVideo(trailer?.key || null));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
        }
      }
    };

    getMovieVideos();

    return () => {
      controller.abort();
    };
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
