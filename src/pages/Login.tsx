import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash,faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constans";
import type { AppDispatch } from "../utils/store";

interface FormData {
  email: string;
  password: string;
}

interface LoginProps{
  handleClose:()=> void
}

function Login({handleClose}:LoginProps ) {
  const navigate = useNavigate();




  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch =useDispatch<AppDispatch>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await axios.post(
       BASE_URL + "/login",
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      
      alert("Login successful!");

      localStorage.setItem('token','true')
      dispatch(addUser({_id:result.data?._id,
        firstName:result.data.firstName,
        lastName:result.data.lastName,
        image:result.data?.image || 'https://lh3.googleusercontent.com/a/ACg8ocKuOHSha7tvxnAlvvFbzL-sjEkgN5CBkLLClTt9YW47buEmgA=s192-c-mo',
        age:result.data.age,
        gender:result.data.gender
      }))
      navigate('/profile')
        
      
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        alert(err?.response?.data || err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      } else { 
        alert("Unexpected error occurred");
      }
    }
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button className="text-gray-500 hover:text-gray-700 font-extrabold absolute right-4 top-4"  onClick={handleClose}>
         <FontAwesomeIcon icon={faXmark}  className="cursor-pointer"/>
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 ">
          Welcome Back 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8-6H8m8 12H8m10 4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12z"
                />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-pink-600 hover:underline hover:text-pink-700"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 rounded-lg shadow-md active:scale-95 transition-transform"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-pink-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
