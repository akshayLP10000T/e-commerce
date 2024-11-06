import { House, Loader2, Mail, PenBox, Phone } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { User } from "@/types/user";
import { Button } from "../ui/button";
import { toast } from "sonner";
import isEqual from 'lodash.isequal';
import axios from "axios";
import { setUser } from "@/redux/userSlice";

const Profile = () => {
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

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

  const [loading, setLoading] = useState<boolean>(false);

  const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put("http://localhost:8080/api/v1/user/update-profile", userData, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-2 px-5">
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
  );
};

export default Profile;
