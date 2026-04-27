import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movieItem }) => {
  if (!movieItem?.backdrop_path && !movieItem?.poster_path) return null;

  const imagePath = movieItem.backdrop_path || movieItem.poster_path;

  return (
    <div
      className="w-36 sm:w-40 md:w-48 lg:w-56 shrink-0
        rounded-md overflow-hidden cursor-pointer"
    >
      <img
        src={IMG_CDN_URL + imagePath}
        alt={movieItem.title || movieItem.name}
        className="w-full h-full object-cover hover:scale-110 
        transition-transform duration-300"
      />
    </div>
  );
};

export default MovieCard;
