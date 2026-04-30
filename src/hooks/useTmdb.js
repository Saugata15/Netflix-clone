import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, tmdbLanguageMap } from "../utils/constants";

const useTmdb = (endpoint, actionCreator) => {
  const dispatch = useDispatch();

  const lang = useSelector((store) => store.language.currentLanguage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const separator = endpoint.includes("?") ? "&" : "?";

        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}${separator}language=${tmdbLanguageMap[lang]}`,
          API_OPTIONS
        );

        const data = await response.json();

        dispatch(actionCreator(data.results || data));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [endpoint, lang, dispatch, actionCreator]);
};

export default useTmdb;