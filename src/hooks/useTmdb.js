import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, tmdbLanguageMap } from "../utils/constants";

const useTmdb = (endpoint, actionCreator, selectorFn) => {
  const dispatch = useDispatch();

  const existingData = useSelector(selectorFn);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (existingData && existingData.length > 0) return;

    const fetchData = async () => {
      try {
        // const response = await fetch(
        //   `https://api.themoviedb.org/3/${endpoint}`,
        //   API_OPTIONS
        // );
        const separator = endpoint.includes("?") ? "&" : "?";

        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}${separator}&api_key=${API_KEY}`,
          API_OPTIONS
        );

        const data = await response.json();

        dispatch(actionCreator(data.results || data));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [endpoint, dispatch, actionCreator, existingData]);
};

export default useTmdb;