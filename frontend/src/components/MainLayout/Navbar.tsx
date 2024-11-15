import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Home,
  ListOrdered,
  Loader2,
  Search,
  ShoppingCart,
  User2,
  UserCheck2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { setStoreData } from "@/redux/storeSlice";
import { setStoreRequest } from "@/redux/adminSlice";

const Navbar = () => {
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(setStoreData(null));
        dispatch(setStoreRequest(null));
        navigate("/login", {
          replace: true,
        });
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-fit py-3 px-5 flex items-center justify-between">
      <Link to={"/"} className="text-2xl font-extrabold uppercase">
        Buyfrom<span className="text-primary dark:text-primary-dark">hell</span>
      </Link>
      <div className="gap-3 items-center justify-center hidden lg:flex">
        {user && user.admin && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex">
              <UserCheck2Icon /> Admin Dashboard
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/admin/stores"}>Stores</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Users</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {user && user.store && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex">
              <ShoppingCart /> Store Dashboard
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/store/items"}>Items</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Link
          className="flex hover:text-black dark:hover:text-white"
          to={"/search"}
        >
          <Search /> Search
        </Link>
        <Link
          className="flex hover:text-black dark:hover:text-white"
          to={"/orders"}
        >
          <ListOrdered /> Orders
        </Link>
        <Link
          className="flex hover:text-black dark:hover:text-white"
          to={"/cart"}
        >
          <ShoppingCart />
          Cart
        </Link>
        <Link
          className="flex hover:text-black dark:hover:text-white"
          to={user ? "/profile" : "/login"}
        >
          <User2 /> {user ? user.fullName : "Login"}
        </Link>
        {user &&
          (loading ? (
            <Button disabled className="text-white">
              <Loader2 className="animate-spin" /> Please Wait...
            </Button>
          ) : (
            <Button onClick={logoutHandler} className="text-white">
              Logout
            </Button>
          ))}
      </div>
      <div className="lg:hidden flex cursor-pointer text-lg w-fit h-fit p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
        <Sheet>
          <SheetTrigger>
            <HamburgerMenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-5">Menu</SheetTitle>
            </SheetHeader>
            <div className="gap-2 items-start justify-center lg:hidden flex flex-col w-full">
              <Link
                className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                to={"/"}
              >
                <Home /> Home
              </Link>
              <Link
                className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                to={"/search"}
              >
                <Search /> Search
              </Link>
              <Link
                className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                to={"/orders"}
              >
                <ListOrdered /> Orders
              </Link>
              <Link
                className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                to={"/cart"}
              >
                <ShoppingCart />
                Cart
              </Link>
              <Link
                className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                to={user ? "/profile" : "/login"}
              >
                <User2 /> {user ? user.fullName : "Login"}
              </Link>
              <Separator className="my-2" />
              <Label>Admin</Label>

              {user?.admin && (
                <div className="w-full">
                  <Link
                    className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                    to={"/admin/stores"}
                  >
                    <UserCheck2Icon /> Stores
                  </Link>
                  <Link
                    className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                    to={"/admin/users"}
                  >
                    <UserCheck2Icon /> Users
                  </Link>
                </div>
              )}

              <Separator className="my-2" />
              <Label>Store</Label>

              {user?.store && (
                <div className="w-full">
                  <Link
                    className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                    to={"/store/items"}
                  >
                    <ShoppingCart /> Items
                  </Link>
                  <Link
                    className="flex hover:text-black dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-200 w-full py-2 px-2 rounded-md"
                    to={"/store/orders"}
                  >
                    <ShoppingCart /> Orders
                  </Link>
                </div>
              )}

              <div className="w-full">
                {user &&
                  (loading ? (
                    <Button disabled className="text-white w-full">
                      <Loader2 className="animate-spin" /> Please Wait...
                    </Button>
                  ) : (
                    <Button
                      onClick={logoutHandler}
                      className="text-white w-full"
                    >
                      Logout
                    </Button>
                  ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
