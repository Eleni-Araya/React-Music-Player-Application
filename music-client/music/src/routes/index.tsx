import { Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/loginPage";
import MusicListPage from "../pages/Music-list/musicList";
import PageNotFound from "../pages/pageNotFOund";
export default [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <Navigate to="/login" />,
  },
  {
    path: "music",
    element: <MusicListPage />,
  },
  {
    path: "*",
    element: <PageNotFound />
  }
];