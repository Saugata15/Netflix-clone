import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  API_OPTIONS,
  IMG_CDN_URL_ORIGINAL,
  tmdbLanguageMap,
} from "../utils/constants";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import NetflixLoader from "./NetflixLoader";
import { Play } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const langKey = useSelector((store) => store.language.currentLanguage);
  const trailerKey = useSelector((store) => store.movies.trailerVideo);
  useMovieTrailer(id);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
        API_OPTIONS,
      );
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <NetflixLoader />;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="relative w-full h-[80vh]">
        <img
          src={
            movie.backdrop_path
              ? IMG_CDN_URL_ORIGINAL + movie.backdrop_path
              : IMG_CDN_URL_ORIGINAL + movie.poster_path
          }
          alt="backdrop"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black  to-black/50" />

        {/* Content */}
        <div className="absolute bottom-16 left-6 md:left-12 max-w-xl animate-[fadeIn_0.6s_ease-in]">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            {movie.title || movie.name}
          </h1>

          <p className="text-gray-200 text-sm md:text-base line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              className="flex items-center gap-2 bg-white text-black font-bold 
        px-6 py-3 rounded-md hover:bg-gray-200 
        transition duration-200 shadow-xl cursor-pointer"
            >
              <Play size={18} fill="black" />
              <span className="text-sm md:text-base">Play</span>
            </button>

            <button
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md 
        text-white font-semibold px-6 py-3 rounded-md 
        hover:bg-white/30 transition duration-200 cursor-pointer"
            >
              + My List
            </button>
          </div>
        </div>
      </div>

      {/* 🧾 DETAILS SECTION */}
      <div className="px-6 md:px-12 py-10 max-w-5xl animate-[fadeIn_0.8s_ease-in]">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-300 mb-6">{movie.overview}</p>

        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
          <span>⭐ {movie.vote_average}</span>
          <span>📅 {movie.release_date}</span>
          <span>🎭 {movie.genres?.map((g) => g.name).join(", ")}</span>
        </div>
      </div>

      {/* 🎥 TRAILER */}
      {trailerKey && (
        <div className="px-6 md:px-12 pb-12 animate-[fadeIn_1.2s_ease-in]">
          <h2 className="text-xl font-semibold mb-4">Trailer</h2>

          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
