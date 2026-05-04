import { useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";
import { Info, Play } from "lucide-react";
import { HERO_IMG_URL } from "../utils/constants";

const HeroBanner = ({ movie }) => {
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];
  if (!movie) return null;

  return (
    <div className="relative h-[90vh] w-full text-white">
      <img
        src={HERO_IMG_URL + movie.backdrop_path}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" /> */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60"></div>

      <div className="absolute bottom-40 left-6 md:left-16 max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {movie.title || movie.name}
        </h1>

        <p className="text-gray-300 text-sm md:text-base line-clamp-3">
          {movie.overview}
        </p>

        <div className="mt-4 flex gap-4">
          <button
            className="flex items-center gap-2 bg-white text-black font-bold
          px-5 md:px-6 py-2.5 md:py-3 rounded hover:bg-gray-200
          transition-all duration-200 cursor-pointer shadow-lg"
          >
            <Play size={20} className="max-sm:w-4 max-sm:h-4" fill="black" />
            <span>{text.play}</span>
          </button>

          <button
            className="flex items-center gap-2 bg-gray-500/60 backdrop-blur-sm
         text-white font-semibold max-sm:font-medium px-6 md:px-7 py-2.5 md:py-3 rounded
         hover:bg-gray-400/70 transition-all duration-200
          cursor-pointer shadow-lg"
          >
            <Info size={20} />
            <span>{text.moreInfo}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
