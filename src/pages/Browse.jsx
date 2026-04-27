import { useSelector } from "react-redux";
import InnerContainer from "../components/InnerContainer";
import MainContainer from "../components/MainContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";

const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  return (
    <div className="text-white">
          <MainContainer />
          <InnerContainer />
    </div>
  );
};

export default Browse;
