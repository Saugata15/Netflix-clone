import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Browse from "../pages/Browse";
import ProtectedRoute from "../components/ProtectedRoute";

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
    ],
  },
]);

export default router;
