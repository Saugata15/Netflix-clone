import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfigue";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../src/store/userSlice";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "./components/PageTransition";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(addUser({ uid, email }));
      } else {
        dispatch(removeUser());
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      {isAuthLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ScrollToTop />
          <Header />
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition location={location} />
          </AnimatePresence>
          {user && <Footer />}
        </>
      )}
    </div>
  );
};

export default App;
