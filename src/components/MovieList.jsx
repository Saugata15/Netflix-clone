import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.9;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group mb-10">
      <h2 className="text-white text-xl md:text-xl font-semibold mb-4">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-27 -translate-y-1/2 z-20
         text-white  opacity-0
        group-hover:opacity-100 transition hidden md:flex"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-27 -translate-y-1/2 z-20
         text-white opacity-0
        group-hover:opacity-100 transition hidden md:flex"
      >
        <ChevronRight size={28} />
      </button>

      {/* Row */}
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-scroll scroll-smooth hide-scrollbar"
      >
        {movies.map((movieItem) => (
          <MovieCard key={movieItem.id} movieItem={movieItem} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
