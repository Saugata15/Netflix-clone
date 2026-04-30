import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfigue";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../src/store/userSlice";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const dispatch = useDispatch();
  const [authLoading, setAuthLoading] = useState(true);
  const movies = useSelector((store) => store.movies.nowPlayingMoviesList);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(addUser({ uid, email }));
      } else {
        dispatch(removeUser());
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header />
      <Outlet />
      {movies && <Footer />}
    </div>
  );
};

export default App;
