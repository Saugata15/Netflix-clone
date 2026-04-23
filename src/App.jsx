import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfigue";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../src/store/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(addUser({ uid, email }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
