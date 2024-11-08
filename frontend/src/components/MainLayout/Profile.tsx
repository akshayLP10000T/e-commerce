import {
  Code2,
  House,
  Loader2,
  LockKeyholeOpenIcon,
  Mail,
  MapIcon,
  PenBox,
  Phone,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { User } from "@/types/user";
import { Button } from "../ui/button";
import { toast } from "sonner";
import isEqual from "lodash.isequal";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Store } from "@/types/store";

const Profile = () => {
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const gettingUserData = async ()=>{
    try {

      const res = await axios.get("http://localhost:8080/api/v1/user/get-user-data", {
        withCredentials: true
      });

      if(res.data.success){
        dispatch(setUser(res.data.user));
      }
      
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const originalData: Partial<User> = {
    fullName: user.fullName,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address,
  };

  const [userData, setUserData] = useState<Partial<User>>({
    fullName: user.fullName,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address,
  });

  const [storeFormData, setStoreFormData] = useState<Partial<Store>>({
    address: user.address,
    accountNumber: 123456789,
    confirmAccountNumber: 123456789,
    ifscCode: "",
    nameAccount: user.fullName,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStoreApply, setLoadingStoreApply] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:8080/api/v1/user/update-profile",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const applyForStoreHandler = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {

      setLoadingStoreApply(true);

      const res = await axios.post("http://localhost:8080/api/v1/user/apply-store", storeFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if(res.data.success){
        gettingUserData();
        setDialogOpen(false);
        toast.success(res.data.message);
      }
      
    } catch (error: any) {

      console.log(error);
      toast.error(error.response.data.message);

    }
    finally{
      setLoadingStoreApply(false);
    }
  }

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value });
  };

  const valueChangeHandlerStoreForm = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setStoreFormData({...storeFormData, [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value})
  }

  return (
    <div className="py-2 px-5 w-full">
      <div>
        <h2 className="text-3xl font-semibold">Personal Information</h2>
        <form
          className="space-y-2 mt-5"
          onSubmit={(e) => updateProfileHandler(e)}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-1/2 -translate-y-1/2 ml-2" />
              <Input
                name="email"
                disabled
                className="px-10"
                value={userData.email}
                placeholder="Email"
                type="email"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <PenBox className="absolute top-1/2 -translate-y-1/2 ml-2" />
              <Input
                name="fullName"
                className="px-10"
                value={userData.fullName}
                placeholder="Enter your fullName"
                type="name"
                onChange={(e) => valueChangeHandler(e)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <House className="absolute top-1/2 -translate-y-1/2 ml-2" />
              <Input
                name="address"
                className="px-10"
                value={userData.address}
                placeholder="Enter your address"
                type="text"
                onChange={(e) => valueChangeHandler(e)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <div className="relative">
              <Phone className="absolute top-1/2 -translate-y-1/2 ml-2" />
              <Input
                name="contactNumber"
                className="px-10"
                value={userData.contactNumber}
                placeholder="Enter your Contact Number"
                type="number"
                onChange={(e) => valueChangeHandler(e)}
              />
            </div>
          </div>
          {!isEqual(originalData, userData) && (
            <div>
              {loading ? (
                <Button disabled className="text-white">
                  <Loader2 className="animate-spin" /> Please Wait...
                </Button>
              ) : (
                <Button type="submit" className="text-white">
                  Update Profile
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
      {!user.store && (
        <div className="w-full">
          <h2 className="text-3xl font-bold mt-10">
            Want to open a store and sell products?
          </h2>

          {user.appliedForStore ? (
            <div>Already applied for store</div>
          ) : (
            <div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
                <DialogTrigger>
                  <Button className="text-white mt-7 w-full">
                    Apply for Store
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Open you own store and earn money</DialogTitle>
                    <DialogDescription>
                      Fill and check all the details. We will check and notify
                      you as soon as possible
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-2" onSubmit={(e)=>applyForStoreHandler(e)}>
                    <div>
                      <Label htmlFor="address">Address of store</Label>
                      <div className="relative">
                        <MapIcon className="absolute top-1/2 -translate-y-1/2 ml-1" />
                        <Input
                          className="pl-10"
                          placeholder="Enter your store address"
                          type="text"
                          name="address"
                          value={storeFormData.address}
                          onChange={(e)=>valueChangeHandlerStoreForm(e)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <div className="relative">
                        <LockKeyholeOpenIcon className="absolute top-1/2 -translate-y-1/2 ml-1" />
                        <Input
                          className="pl-10"
                          placeholder="Enter your Account number"
                          type="number"
                          name="accountNumber"
                          value={storeFormData.accountNumber}
                          onChange={(e)=>valueChangeHandlerStoreForm(e)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmAccountNumber">
                        Confirm Account Number
                      </Label>
                      <div className="relative">
                        <LockKeyholeOpenIcon className="absolute top-1/2 -translate-y-1/2 ml-1" />
                        <Input
                          className="pl-10"
                          placeholder="Confirm Account number"
                          type="number"
                          name="confirmAccountNumber"
                          value={storeFormData.confirmAccountNumber}
                          onChange={(e)=>valueChangeHandlerStoreForm(e)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">
                        IFSC Code
                      </Label>
                      <div className="relative">
                        <Code2 className="absolute top-1/2 -translate-y-1/2 ml-1" />
                        <Input
                          className="pl-10"
                          placeholder="IFSC Code"
                          type="text"
                          name="ifscCode"
                          value={storeFormData.ifscCode}
                          onChange={(e)=>valueChangeHandlerStoreForm(e)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nameAccount">
                        Name used in bank account
                      </Label>
                      <div className="relative">
                        <LockKeyholeOpenIcon className="absolute top-1/2 -translate-y-1/2 ml-1" />
                        <Input
                          className="pl-10"
                          placeholder="Enter name used in bank"
                          type="name"
                          name="nameAccount"
                          value={storeFormData.nameAccount}
                          onChange={(e)=>valueChangeHandlerStoreForm(e)}
                        />
                      </div>
                    </div>
                    <div>
                      {
                        loadingStoreApply?<Button disabled className="text-white w-full"><Loader2 className="animate-spin" />Please Wait...</Button> : <Button type="submit" className="text-white w-full">Submit</Button>
                      }
                      
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
