import { setStoreRequest } from "@/redux/adminSlice";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const Stores = () => {
  const dispatch = useDispatch();
  const { storeRequest } = useSelector((store: any) => store.admin);

  useEffect(() => {
    const getAllStoreRequest = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/admin/get-store-request",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setStoreRequest(res.data.users));
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    getAllStoreRequest();
  }, []);

  return (
    <div className="p-3">
      <h1 className="mb-5 text-5xl font-extrabold">Store Requests</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        {storeRequest.map((item: Partial<User>) => {
          // const data = item.storeData;

          return (
            <div
              key={item._id}
              className="p-3 shadow-sm hover:shadow-xl cursor-pointer duration-300 border-2 border-primary rounded-md  transition-shadow"
            >
              <h6 className="text-3xl font-bold">{item.fullName}</h6>
              <h5 className="text-lg opacity-80 mt-1">{item.email}</h5>
              <Dialog>
                <DialogTrigger className="mt-3 w-full"><Button className="text-white w-full">Check details</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.fullName}</DialogTitle>
                    <DialogDescription>
                      Check details of store of {item.fullName} and give him access to his store
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stores;
