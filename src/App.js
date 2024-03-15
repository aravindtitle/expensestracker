import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import WelcomePage from "./page/WelcomePage";
import Profile from "./components/Profile";
import Expense from "./components/Expense/Expense";
import { CheckAuthLoader } from "./Util/auth";
import Root from "./components/Root";
import Auth from "./page/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/AuthReduces";

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: "auth", element: <Auth /> },
        { path: "profile", element: <Profile /> },
        { path: "expense", element: <Expense />, loader: CheckAuthLoader },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(authActions.login(localStorage.getItem("Token")));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
