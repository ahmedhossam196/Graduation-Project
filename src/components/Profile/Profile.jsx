import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import z from "zod";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
  });

  const [address, setAddress] = useState("");

  

  // Fetch profile data
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return toast.error("You are not logged in");

    setIsLoading(true);

    const savedUser = localStorage.getItem("userData");
    const savedAddress = localStorage.getItem("userAddress");

    if (savedUser) setUserData(JSON.parse(savedUser));
    if (savedAddress) setAddress(savedAddress);

    axios
      .get("http://smartbracelet.runasp.net/api/auth/CurrentUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserData(res.data.data);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
      })
      .catch(() => toast.error("Failed to load user data"))
      .finally(() => setIsLoading(false));

    axios
      .get("http://smartbracelet.runasp.net/api/address", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userAddress =
          res.data?.data?.[0]?.userAddress || "No address available";
        setAddress(userAddress);
        localStorage.setItem("userAddress", userAddress);
      })
      .catch(() => toast.error("Failed to load address"));
  }, []);

  // Validation function
  function validateFields(data) {
    if (!data.firstName) throw new Error("First name is required");
    if (!data.lastName) throw new Error("Last name is required");
    if (!data.email) throw new Error("Email is required");
    if (!/\S+@\S+\.\S+/.test(data.email)) throw new Error("Invalid email address");
    if (!data.dateOfBirth) throw new Error("Date of birth is required");
    if (new Date(data.dateOfBirth) >= new Date())
      throw new Error("Date of birth can't be in the future");

    // Phone validation
    const phone = data.phoneNumber;
    if (!phone) throw new Error("Phone number is required");
    if (phone.length < 11) throw new Error("Phone number seems incomplete");
    if (!/^01[0-2,5]\d{8}$/.test(phone))
      throw new Error(
        "Phone number must be 11 digits and start with 010, 011, 012, or 015 (Egyptian number)"
      );
  }

  // Update profile
  function handleUpdate() {
    try {
      validateFields(userData); // validate all fields
    } catch (err) {
      return toast.error(err.message);
    }

    const token = localStorage.getItem("userToken");
    setIsLoading(true);

    axios
      .post("http://smartbracelet.runasp.net/api/auth/updateUser", userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Profile updated successfully ✔");
        setIsEditing(false);
        localStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch(() => toast.error("Failed to update profile"))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6 flex justify-center pt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-3xl">
        <h1 className="text-center text-4xl font-extrabold text-[#009DDC] mb-8">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-8 transition-colors duration-300">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 bg-[#009DDC]/20 dark:bg-[#009DDC]/30 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-[#009DDC]" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4" /> {userData.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-6 bg-[#009DDC] text-white px-6 py-2 rounded-xl shadow hover:scale-[1.03] transition cursor-pointer"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Inputs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl transition-colors duration-300">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-100">
                  {userData.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-100">
                  {userData.lastName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      phoneNumber: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  maxLength={11}
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                  placeholder="01012345678"
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-100">
                  {userData.phoneNumber}
                </p>
              )}
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                Birthday
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) =>
                    setUserData({ ...userData, dateOfBirth: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-100">
                  {userData.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
              Address
            </label>
            <p className="text-gray-800 dark:text-gray-100">{address}</p>
          </div>

          {isEditing && (
            <button
              onClick={handleUpdate}
              className="w-full mt-8 bg-green-600 text-white p-3 rounded-xl shadow hover:scale-[1.03] transition cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
