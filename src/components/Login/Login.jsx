import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext"; 
import toast, { Toaster } from "react-hot-toast";
import loginpic from "../../assets/LoginImage.png";
import DarkImage from "../../assets/DarkImage.png";

export default function Login() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const navigate = useNavigate();
  const { setuserLogin } = useContext(UserContext);

  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { register, handleSubmit, formState } = form;

  // Show validation errors in order
  useEffect(() => {
    const errors = formState.errors;
    const fieldsOrder = ["email", "password"];
    for (const field of fieldsOrder) {
      if (errors[field]) {
        toast.error(errors[field].message);
        break; // Show one error at a time in order
      }
    }
  }, [formState.errors]);

  function handleLogin(data) {
    setIsLoading(true);
    setApiError("");

    axios
      .post("http://smartbracelet.runasp.net/api/auth/login", data)
      .then((res) => {
        if (res.data.message === "Success") {
          localStorage.setItem("userToken", res.data.data.token);
          setuserLogin(res.data.data.token);
          navigate("/");
        }
      })
      .catch(() => {
        // setApiError("Incorrect Email or Password");
        toast.error("Incorrect Email or Password");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition p-6 flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-10">
        {/* Login Card */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 transition"
        >
          {apiError && (
            <p className="bg-red-600 text-white p-3 rounded-xl mb-4 text-center">
              {apiError}
            </p>
          )}

          <h1 className="text-3xl font-bold text-[#009DDC]">Sign in</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Log in and discover how SmartCare keeps you and your loved ones
            protected.
          </p>

          {/* Email */}
          <div className="mt-6">
            <label className="font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="Enter Email"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="Enter Password"
            />
          </div>

          {/* Remember + Forget */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex gap-2 items-center text-gray-700 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" className="accent-[#009DDC]" /> Remember me
            </label>
            <Link
              to="forgetPassword"
              className="text-[#009DDC] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer mt-8 bg-[#009DDC] text-white p-3 rounded-xl hover:scale-[1.02] transition shadow-lg active:scale-95"
          >
            {isLoading ? "Loading..." : "Sign in"}
          </button>

          <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
            Don't have an account?
            <Link to="/register" className="text-[#009DDC] ml-1 underline">
              Register here
            </Link>
          </p>
        </form>

        {/* Image Section */}
        <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#009DDC]/10 to-transparent dark:from-[#009DDC]/5">
          <div className="absolute top-0 -left-10 w-40 h-40 bg-[#009DDC]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-10 w-40 h-40 bg-[#009DDC]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 p-4 transform transition-all duration-700 hover:scale-105">
            <img
              src={isDarkMode ? DarkImage : loginpic}
              className="rounded-2xl w-full max-h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,157,220,0.3)]"
              alt="SmartCare Visual"
            />
          </div>

          <div className="text-center mt-6 z-10 px-6">
            <h2 className="text-2xl font-bold text-[#009DDC] dark:text-white">
              Safe & Secure
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-xs">
              Join our community and experience the best care for your health
              and family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
