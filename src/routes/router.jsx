import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Browse from "../pages/Browse";
import ProtectedRoute from "../components/ProtectedRoute";
import Search from "../pages/Search";
import MovieDetails from "../components/MovieDetails";
import TvDetails from "../components/TvDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "browse",
        element: (
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        ),
      },
      {
        path: "movie/:id",
        element: (
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "tv/:id",
        element: (
          <ProtectedRoute>
            <TvDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
