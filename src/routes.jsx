import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>error</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 - page not found!</h1>,
  },
]);
