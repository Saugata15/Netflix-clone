import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import languageConstants from "../utils/languageConstants";

const ComingSoon = () => {
  const location = useLocation();
  const langKey = useSelector((store) => store.language.currentLanguage);
  const text = languageConstants[langKey];

  const pageName = location.pathname.replace("/", "");

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        {text.comingSoonTitle}
      </h1>

      <p className="text-gray-400 text-lg mb-2">
        {text.comingSoonDescriptionStart}{" "}
        <span className="text-white capitalize">{pageName}</span>{" "}
        {text.comingSoonDescriptionEnd}
      </p>

      <p className="text-gray-500 text-sm">{text.comingSoonSubtitle}</p>
    </div>
  );
};

export default ComingSoon;
