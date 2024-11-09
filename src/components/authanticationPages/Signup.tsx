/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
// import { useSignupMutation } from "../../redux/features/authantication/AuthenticationApi";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignupMutation } from "../../redux/features/authantication/AuthenticationApi";
import { toast } from "sonner";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const Signup = () => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData: FormData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      password: form.password.value,
    };
    console.log(formData);

    try {
      const res: any = await signup(formData);
      if (res?.data?.success) {
        toast.message("Registration successfully");
        navigate("/login");
      }
    } catch {
      form.reset();
    }
  };

  return (
    <main className="md:flex my-20 justify-center items-center">
      {/* sm device */}
      <div className="w-full h-full md:hidden">
        <img
          className="w-full object-cover"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
          alt=""
        />
      </div>

      {/* form section */}
      <div className="md:ml-20 md:w-5/6 m-auto p-3">
        <form onSubmit={handleSubmit} className="font-titlefont w-full">
          <p className="font-semibold text-2xl">Register now!</p>
          <p className="text-gray-400 mt-2">
            Already have an account?
            <Link to="/login">
              <small className="font-semibold ml-3 text-blue-500">Login</small>
            </Link>
          </p>

          <div className="md:flex gap-2 w-full">
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Name</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
            </ul>
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Address:</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full"
                type="text"
                name="address"
                placeholder="Your address"
                required
              />
            </ul>
          </div>
          <div className="md:flex gap-2 w-full">
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Phone No:</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full"
                type="text"
                name="phone"
                placeholder="Your phone no"
                required
              />
            </ul>
            <ul className="md:w-1/2 relative">
              <p className="font-bodyfont mt-2">Password</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                required
              />
              <span
                className="absolute right-2 md:top-11 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </ul>
          </div>
          <div>
            <p className="font-bodyfont mt-2">Email address:</p>
            <input
              className="w-full outline-none border p-1 rounded mt-1"
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
          </div>
          <button
            className="mt-4 text-white  font-titlefont text-sm  p-1 bg-designColor  opacity-80 hover:opacity-100 duration-700"
            type="submit"
          >
            Ragistration
          </button>
        </form>
      </div>

      {/* lg device */}
      <div className="md:block hidden">
        <img
          className="object-cover"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
          alt=""
        />
      </div>
    </main>
  );
};

export default Signup;
