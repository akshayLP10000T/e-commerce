import Navbar from "@/components/MainLayout/Navbar";
import { setStoreRequest } from "@/redux/adminSlice";
import { setStoreData } from "@/redux/storeSlice";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";

const MainLayout = () => {
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const gettingUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/get-user-data",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
      }
    } catch (error: any) {
      dispatch(setUser(null));
      dispatch(setStoreData(null));
      dispatch(setStoreRequest(null));
      toast.error(error.response.data.message);
    }
  };

  if (user) {
    useEffect(() => {
      gettingUserData();
    }, [Outlet]);
  }

  return (
    <div>
      <Navbar />
      <div className="h-[2px] w-full bg-gray-200 dark:bg-gray-800"></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
