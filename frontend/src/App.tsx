import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: "HeroSection",
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
  return (
    <div className="w-full h-full bg-background dark:bg-background-dark text-text dark:text-text-dark transition-colors duration-500">
      <RouterProvider router={appRouter}></RouterProvider>{" "}
      {/*Router Provider */}
    </div>
  );
};

export default App;
