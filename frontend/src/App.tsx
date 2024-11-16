import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HeroSection from "./components/MainLayout/HeroSection";
import Profile from "./components/MainLayout/Profile";
import Stores from "./components/admin/Stores";
import Items from "./components/store/Items";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { gettingStoreData } from "./hooks/useGetStoreData";
import { gettingAllItems } from "./hooks/useGetAllItems";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin/stores",
        element: <Stores />,
      },
      {
        path: "/store/items",
        element: <Items />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  if (user?.store) {
    useEffect(() => {
      gettingStoreData(dispatch);
      gettingAllItems(dispatch);
    }, []);
  }

  return (
    <div className="w-full h-full bg-background dark:bg-background-dark text-text dark:text-text-dark transition-colors duration-500">
      <RouterProvider router={appRouter}></RouterProvider>{" "}
      {/*Router Provider */}
    </div>
  );
};

export default App;
