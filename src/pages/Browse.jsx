import MainContainer from "../components/MainContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div className="text-white">
      <MainContainer />
    </div>
  );
};

export default Browse;
