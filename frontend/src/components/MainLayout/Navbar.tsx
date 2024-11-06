import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((store: any)=>store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const logoutHandler = async ()=>{
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/user/logout", {
        withCredentials: true,
      });

      if(res.data.success){
        dispatch(setUser(null));
        navigate("/login", {
          replace: true,
        });
        toast.success(res.data.message);
      }
      
    } catch (error: any) {
      toast.error(error.response.error.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-fit py-3 px-5 flex items-center justify-between">
      <h3 className="text-2xl font-extrabold uppercase">
        Buyfrom<span className="text-primary dark:text-primary-dark">hell</span>
      </h3>
      <div className="flex gap-3 items-center justify-center">
        <Link
          className="flex hover:text-black dark:hover:text-white"
          to={"/cart"}
        >
          <ShoppingCart />
          Cart
        </Link>
        <Link
          className="flex hover:text-black dark:hover:text-white"
          to={user ? "/profile": "/login"}
        >
          <User2 /> {user ? user.fullName : "Login"}
        </Link>
        {
          user && (loading ? <Button disabled className="text-white"><Loader2 className="animate-spin" /> Please Wait...</Button> : <Button onClick={logoutHandler} className="text-white">Logout</Button>)
        }
        
      </div>
    </div>
  );
};

export default Navbar;
