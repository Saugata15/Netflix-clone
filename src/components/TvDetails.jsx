import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL_ORIGINAL } from "../utils/constants";
import { useSelector } from "react-redux";
import useTvTrailer from "../hooks/useTvTrailer";
import NetflixLoader from "../components/NetflixLoader";

const TvDetails = () => {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const trailerKey = useSelector((store) => store.movies.trailerVideo);

  useTvTrailer(id);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTv = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}`,
          { ...API_OPTIONS, signal: controller.signal }
        );
        const data = await res.json();
        if (!res.ok) return setTv(null);
        setTv(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    };

    fetchTv();
    return () => controller.abort();
  }, [id]);

  if (!tv) return <NetflixLoader />;

  const imageUrl = tv.backdrop_path
    ? IMG_CDN_URL_ORIGINAL + tv.backdrop_path
    : tv.poster_path
    ? IMG_CDN_URL_ORIGINAL + tv.poster_path
    : "/fallback.jpg";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO */}
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <img src={imageUrl} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50" />

        <div className="absolute bottom-6 md:bottom-10 left-4 md:left-12 max-w-xl px-2">
          <h1 className="text-2xl md:text-5xl font-bold mb-2">
            {tv.name}
          </h1>

          <p className="text-gray-300 text-sm md:text-base line-clamp-3">
            {tv.overview}
          </p>

          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() =>
                document.getElementById("trailer")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="bg-white text-black px-5 py-2 rounded-md font-semibold text-sm md:text-base"
            >
              ▶ Play
            </button>

            <button className="bg-gray-700 px-5 py-2 rounded-md text-sm md:text-base">
              + My List
            </button>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="px-4 md:px-12 py-8 max-w-6xl">
        <h2 className="text-lg md:text-xl font-semibold mb-3">Overview</h2>
        <p className="text-gray-300 mb-6 text-sm md:text-base">
          {tv.overview}
        </p>

        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 text-sm text-gray-400">
          <span>⭐ {tv.vote_average}</span>
          <span>📅 {tv.first_air_date}</span>
          <span>📺 {tv.number_of_seasons} Seasons</span>
          <span>🎭 {tv.genres?.map((g) => g.name).join(", ")}</span>
        </div>
      </div>

      {/* TRAILER */}
      {trailerKey && (
        <div id="trailer" className="px-4 md:px-12 pb-10">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Trailer
          </h2>

          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TvDetails;