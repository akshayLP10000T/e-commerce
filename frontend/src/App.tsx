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
import axios from "axios";
import { setItemsData, setStoreData } from "./redux/storeSlice";
import { toast } from "sonner";

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
        element: <Profile />
      },
      {
        path: "/admin/stores",
        element: <Stores />
      },
      {
        path: "/store/items",
        element: <Items />
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
  const dispatch = useDispatch();
  const {user} = useSelector((store: any)=> store.user);

  if(user?.store){
    
    useEffect(() => {
      const gettingStoreData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/store/get-store-data",
            {
              withCredentials: true,
            }
          );
          
          if (res.data.success) {
            dispatch(setStoreData(res.data.storeData));
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      };
      
      gettingStoreData();
    }, []);
    
    useEffect(() => {
      try {
        const gettingAllItems = async () => {
          const res = await axios.get(
            "http://localhost:8080/api/v1/store/get-all-items",
            {
              withCredentials: true,
            }
          );
          
          if (res.data.success) {
            dispatch(setItemsData(res.data.items));
          }
          else{
            dispatch(setItemsData(null));
          }
        };
        
        gettingAllItems();
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
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
