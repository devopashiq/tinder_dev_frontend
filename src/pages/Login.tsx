import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constans";
import type { AppDispatch } from "../utils/store";
  import { Bounce, toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface LoginProps {
  handleClose: () => void;
}

function Login({ handleClose }: LoginProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {

      if(isLogin){
const result = await axios.post(BASE_URL + "/login", formData, {
        withCredentials: true,
      });
      console.log(result.data);

     toast.success('Login successful', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
})

      localStorage.setItem("token", "true");
      dispatch(
        addUser({
          _id: result.data?._id,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          photoUrl: result.data?.photoUrl,
          age: result.data?.age,
          gender: result?.data.gender,
          about: result?.data.about,
        })
      );
      navigate("/");
      }else{
        const result = await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });

      const user=result?.data.user

      console.log(result,user);
      
   
       dispatch(
        addUser({
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          photoUrl: user?.photoUrl ||'',
          age:  user?.age || '',
          gender: user?.gender ||'',
          about: user?.about||'',
        })
      );
          navigate("/profile");


      }
      
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        // alert(err?.response?.data?.err || err.message);
        toast.error(err?.response?.data?.err || err.message, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unexpected error occurred");
      }
    }
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8   relative   w-[90%] max-w-md">
        <button
          className="text-gray-500 hover:text-gray-700 font-extrabold absolute right-4 top-4"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} className="cursor-pointer" />
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 ">
        {isLogin?'Welcome Back':'Create an Account'}  
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* First name */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ittachi"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute  left-3 top-3.5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Uchiha"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute  left-3 top-3.5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </>
          )}

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
         {isLogin && <div className="text-right">
            <a
              href="#"
              className="text-sm text-pink-600 hover:underline hover:text-pink-700"
            >
              Forgot password?
            </a>
          </div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 rounded-lg shadow-md active:scale-95 transition-transform"
          >
           {isLogin?'Log In': 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          { isLogin ?'Don’t have an account? ':'Already have an account? '}
          <button className="text-pink-600 hover:underline" onClick={()=>setIsLogin(log=>!log)}>
            
             { isLogin ?'Create an account':'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
