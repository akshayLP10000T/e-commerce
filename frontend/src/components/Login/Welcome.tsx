import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Welcome = () => {
  return (
    <div className="w-full h-[100vh] bg-primary text-text-dark flex items-center justify-center flex-col px-6">
      <div className="p-3 flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl text-center">Welcome Back!</h1>
        <p className="leading-5 text-xl font-medium mt-5 text-center">
          We’re excited to see you again. Sign in to explore our latest
          products, exclusive deals, and a personalized shopping experience just
          for you. Let’s make shopping easy and delightful!
        </p>
      </div>
      <div>
        <Link replace to={"/register"}>
          <Button variant={"secondary"} className="mt-5 font-medium text-base">
            Don't have an account? <span className="underline">SignUp</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
