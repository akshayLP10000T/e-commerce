import Form from "@/components/Register/Form"
import Welcome from "@/components/Register/Welcome"

const Register = () => {
  return (
    <div className="relative w-full h-full flex">
      <div className="flex-1">
        <Form />
      </div>
      <div className="flex-1 lg:flex hidden">
        <Welcome />
      </div>
    </div>
  )
}

export default Register