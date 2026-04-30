import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerKey = useSelector((store) => store.movies.trailerVideo);

  useMovieTrailer(movieId);

  if (!trailerKey) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 lg:scale-200 scale-150 sm:scale-200
      max-sm:w-[177.78vh] sm:w-full max-sm:h-[100vh] h-full
      min-w-full sm:min-h-full sm:h-[100vh] md:w-[120%] md:h-[100vh] lg:h-[100vh] lg:w-full 
      -translate-x-1/2 -translate-y-1/2"
      >
        <iframe
          className="w-full h-full pointer-events-none"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&loop=1&playlist=${trailerKey}&rel=0&playsinline=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
    </div>
  );
};

export default VideoBackground;
