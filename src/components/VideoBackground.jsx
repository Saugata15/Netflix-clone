import { useSelector, useDispatch } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { stopMovie } from "../store/movieSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();

  const trailerKey = useSelector((store) => store.movies.trailerVideo);
  const { isPlaying } = useSelector((store) => store.movies.player);

  useMovieTrailer(movieId);

  // 🔥 PLAY MODE
  if (isPlaying) {
    return (
      <div className="fixed inset-0 z-[999] bg-black">
        <iframe
          key={trailerKey}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
          allow="autoplay"
        />

        {/* CLOSE BUTTON */}
        <button
          onClick={() => dispatch(stopMovie())}
          className="absolute top-10 right-9 text-white text-2xl"
        >
          ✕
        </button>
      </div>
    );
  }

  // 🔥 DEFAULT BACKGROUND
  if (!trailerKey) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 lg:scale-200 scale-150 sm:scale-200
        max-sm:w-[177.78vh] sm:w-full max-sm:h-[80vh] h-full
        min-w-full sm:min-h-full sm:h-screen md:w-[120%] lg:w-full 
        -translate-x-1/2 -translate-y-1/2"
      >
        <iframe
          className="w-full h-full pointer-events-none"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
          title="Movie Trailer"
          allow="autoplay"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
    </div>
  );
};

export default VideoBackground;
