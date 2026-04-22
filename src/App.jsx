import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Home/>
    </div>
  );
};

export default App;
