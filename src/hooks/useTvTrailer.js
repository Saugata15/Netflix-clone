// hooks/useTvTrailer.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTvTrailer = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    dispatch(addTrailerVideo(null));

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos`,
          { ...API_OPTIONS, signal: controller.signal }
        );
        const data = await res.json();

        const trailer = data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        dispatch(addTrailerVideo(trailer?.key || null));
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    };

    fetchTrailer();
    return () => controller.abort();
  }, [id, dispatch]);
};

export default useTvTrailer;