import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Welcome = () => {
  return (
    <div className="w-full h-[100vh] bg-primary text-text-dark flex items-center justify-center flex-col px-6">
      <div className="p-3 flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl text-center">Join Us Today!</h1>
        <p className="leading-5 text-xl font-medium mt-5 text-center">
          Create an account to unlock exclusive perks, personalized
          recommendations, and a seamless shopping experience tailored just for
          you. We’re thrilled to have you on board—let’s get started on an
          amazing journey!
        </p>
      </div>
      <div>
        <Link replace to={"/login"}>
          <Button variant={"secondary"} className="mt-5 font-medium text-base">
            Already have an account? <span className="underline">Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
