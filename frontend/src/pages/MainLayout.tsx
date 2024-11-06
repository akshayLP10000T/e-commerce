import Navbar from "@/components/MainLayout/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[2px] w-full bg-gray-200 dark:bg-gray-800"></div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout