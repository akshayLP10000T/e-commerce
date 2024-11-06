import { Loader2, Mail, PenIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginFormType } from "@/types/forms";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Form = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<Boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/", {
          replace: true,
        });
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-full flex-col px-9 py-2 relative">
      <h2 className="text-primary dark:text-text-dark text-4xl font-bold">
        Login
      </h2>
      <form onSubmit={(e) => loginHandler(e)} className="space-y-2 w-full">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-2" />
            <Input
              name="email"
              onChange={(e) => {
                inputChangeHandler(e);
              }}
              value={formData.email}
              className="pl-10"
              placeholder="Enter your email"
            ></Input>
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <PenIcon className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-2" />
            <Input
              name="password"
              className="pl-10"
              onChange={(e) => {
                inputChangeHandler(e);
              }}
              type="password"
              value={formData.password}
              placeholder="Enter your password"
            ></Input>
          </div>
        </div>
        <div>
          {loading ? (
            <Button disabled type="submit" className="w-full text-white">
              <Loader2 className="animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full text-white">
              Submit
            </Button>
          )}
        </div>
      </form>
      <div className="w-full">
        <h3 className="text-end">
          Don't have an account?{" "}
          <span className="text-secondary underline">
            <Link replace to={"/register"}>
              SignUp
            </Link>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Form;
