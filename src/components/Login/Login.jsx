import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import loginpic from "../../assets/LoginImage.png";

export default function Login() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  });

  const { register, handleSubmit, formState } = form;

  // Dark Mode
  useEffect(() => {
    const checkDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (checkDark.matches) document.documentElement.classList.add("dark");

    checkDark.addEventListener("change", (e) => {
      if (e.matches) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    });
  }, []);

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
      .catch(() => setApiError("Incorrect Email or Password"))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition p-6 flex justify-center items-center">
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
            {formState.errors.email && (
              <p className="text-red-500 mt-1">
                {formState.errors.email.message}
              </p>
            )}
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
            {formState.errors.password && (
              <p className="text-red-500 mt-1">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + Forget */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
              <input type="checkbox" /> Remember me
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
            className="w-full mt-8 bg-[#009DDC] text-white p-3 rounded-xl hover:scale-[1.02] transition"
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

        {/* Image */}
        <div className="flex justify-center items-center">
          <img src={loginpic} className="rounded-3xl w-[90%]" alt="login" />
        </div>
      </div>
    </div>
  );
}
