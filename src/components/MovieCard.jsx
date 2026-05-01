import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ movieItem }) => {
  if (!movieItem?.poster_path) return null;

  const imagePath = movieItem.poster_path;

  const type = movieItem.media_type || (movieItem.name ? "tv" : "movie");

  return (
    <Link to={`/${type}/${movieItem.id}`}>
      <div
        className="w-36 sm:w-40 md:w-48 lg:w-38 shrink-0
        aspect-2/3 rounded-md overflow-hidden cursor-pointer"
      >
        <img
          src={IMG_CDN_URL + imagePath}
          alt={movieItem.title || movieItem.name}
          className="w-full h-full object-cover hover:scale-110 
        transition-transform duration-300"
        />
      </div>
    </Link>
  );
};

export default MovieCard;
