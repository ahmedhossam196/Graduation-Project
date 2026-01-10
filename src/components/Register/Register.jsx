import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Com from "../../assets/Smartcare.com.png";

export default function Register() {
  const [apiSuccessed, setApiSuccessed] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain 8 chars, uppercase, lowercase, number, special char."
      ),
    gender: z.enum(["Male", "Female"], {
      message: "You must choose your gender",
    }),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .refine(
        (date) => {
          const userDate = new Date(date);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return userDate < now;
        },
        { message: "Date of birth can't be in the future" }
      ),
    phoneNumber: z
      .string()
      .regex(
        /^01[0-2,5]\d{8}$/,
        "Invalid Egyptian phone number (11 digits starting with 010/011/012/015)"
      ),
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  function handleRegister(data) {
    setIsLoading(true);
    setApiError("");
    setApiSuccessed("");

    axios
      .post("http://smartbracelet.runasp.net/api/auth/signup", data)
      .then((res) => {
        if (res.data.message === "Success") {
          setApiSuccessed("Account created successfully ✔");

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch(() => {
        setApiError("User Already Exists");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl p-10 transition">
        <div className="text-center mb-3">
          <Link to="/">
            <img src={Com} alt="logo" className="w-35 mx-auto" />
          </Link>
          <h4 className="text-gray-600 dark:text-gray-300 mt-2">
            Create your SmartCare account
          </h4>
        </div>

        {apiSuccessed && (
          <p className="bg-green-500 text-white p-3 rounded-xl mb-4 text-center font-semibold">
            {apiSuccessed}
          </p>
        )}

        {apiError && (
          <p className="bg-red-600 text-white p-3 rounded-xl mb-4 text-center font-semibold">
            {apiError}
          </p>
        )}

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="First name"
              type="text"
            />
            {formState.errors.firstName && (
              <p className="text-red-500 mt-1">
                {formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="Last name"
              type="text"
            />
            {formState.errors.lastName && (
              <p className="text-red-500 mt-1">
                {formState.errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="Email address"
              type="email"
            />
            {formState.errors.email && (
              <p className="text-red-500 mt-1">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Mobile Number
            </label>
            <input
              {...register("phoneNumber")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="Phone number"
              type="text"
            />
            {formState.errors.phoneNumber && (
              <p className="text-red-500 mt-1">
                {formState.errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              placeholder="Password"
              type="password"
            />
            {formState.errors.password && (
              <p className="text-red-500 mt-1">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Birthday
            </label>
            <input
              {...register("dateOfBirth")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              type="date"
            />
            {formState.errors.dateOfBirth && (
              <p className="text-red-500 mt-1">
                {formState.errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formState.errors.gender && (
              <p className="text-red-500 mt-1">
                {formState.errors.gender.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#009DDC] text-white cursor-pointer px-8 py-3 rounded-xl hover:scale-[1.02] transition"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}