import { Play, Info } from "lucide-react";
import { useSelector } from "react-redux";
import languageConstants from "../utils/languageConstants";

const VideoTitle = ({ title, description }) => {
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];
  const finalDescription =
  description || text.descriptionNotAvailable;
  
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col
      justify-center px-6 md:px-16 bg-gradient-to-r
     from-black/80 via-black/40 to-transparent text-white"
    >
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-xl">
        {title}
      </h1>

      <p
        className="mt-4 text-sm md:text-[16px] lg:text-lg max-w-lg line-clamp-3
       text-gray-200"
      >
        {finalDescription}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {/* Play Button */}
        <button
          className="flex items-center gap-2 bg-white text-black font-bold
          px-5 md:px-6 py-2.5 md:py-3 rounded hover:bg-gray-200
          transition-all duration-200 cursor-pointer shadow-lg"
        >
          <Play size={20} className="max-sm:w-4 max-sm:h-4" fill="black" />
          <span>{text.play}</span>
        </button>

        {/* More Info Button */}
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
  );
};

export default VideoTitle;
