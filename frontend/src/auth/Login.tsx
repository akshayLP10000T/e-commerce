import Form from "@/components/Login/Form"
import Welcome from "@/components/Login/Welcome"

const Login = () => {
  return (
    <div className="relative w-full h-full flex">
      <div className="flex-1 lg:flex hidden">
        <Welcome />
      </div>
      <div className="flex-1">
        <Form />
      </div>
    </div>
  )
}

export default Login