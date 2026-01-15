import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Mail,
  User,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return toast.error("You are not logged in");

    setIsLoading(true);
    const savedUser = localStorage.getItem("userData");
    const savedAddress = localStorage.getItem("userAddress");

    if (savedUser) setUserData(JSON.parse(savedUser));
    if (savedAddress) setAddress(savedAddress);

    axios
      .get("/api/auth/CurrentUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserData(res.data.data);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
      })
      .catch(() => toast.error("Failed to load user data"))
      .finally(() => setIsLoading(false));

    axios
      .get("/api/address", {
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

  function validateFields(data) {
    if (!data.firstName) throw new Error("First name is required");
    if (!data.lastName) throw new Error("Last name is required");
    if (!data.email) throw new Error("Email is required");
    if (!/\S+@\S+\.\S+/.test(data.email))
      throw new Error("Invalid email address");
    if (!data.dateOfBirth) throw new Error("Date of birth is required");
    if (new Date(data.dateOfBirth) >= new Date())
      throw new Error("Date of birth can't be in the future");

    const phone = data.phoneNumber;
    if (!phone) throw new Error("Phone number is required");
    if (phone.length < 11) throw new Error("Phone number seems incomplete");
    if (!/^01[0-2,5]\d{8}$/.test(phone))
      throw new Error("Invalid Egyptian phone number");
  }

  function handleUpdate() {
    try {
      validateFields(userData);
    } catch (err) {
      return toast.error(err.message);
    }
    const token = localStorage.getItem("userToken");
    setIsLoading(true);
    axios
      .post("/api/auth/updateUser", userData, {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 p-4 md:p-8 flex justify-center pt-12 transition-colors duration-500"
    >
      <Toaster position="top-center" />

      <div className="w-full max-w-5xl">
        <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              My <span className="text-[#009DDC]">Profile</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Manage your info and account settings
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center cursor-pointer gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
              isEditing
                ? "bg-red-50 text-red-600 dark:bg-red-900/20"
                : "bg-[#009DDC] text-white"
            }`}
          >
            {isEditing ? (
              <>
                <X size={18} /> Cancel
              </>
            ) : (
              <>
                <Edit3 size={18} /> Edit Profile
              </>
            )}
          </motion.button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800 h-fit text-center"
          >
            <div className="relative w-36 h-36 mx-auto mb-6">
              <div className="w-full h-full bg-blue-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-[#009DDC] shadow-inner">
                <User size={70} strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white truncate">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-[#009DDC] font-bold text-[10px] tracking-widest uppercase mt-2">
              Verified Member
            </p>
          </motion.div>

          {/* Details Form Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={isEditing ? "edit" : "view"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
              >
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                  {[
                    { label: "First Name", key: "firstName", icon: User },
                    { label: "Last Name", key: "lastName", icon: User },
                    { label: "Phone Number", key: "phoneNumber", icon: Phone },
                    {
                      label: "Date of Birth",
                      key: "dateOfBirth",
                      icon: Calendar,
                    },
                  ].map(({ label, key, icon: Icon }) => (
                    <div key={key} className="space-y-3">
                      <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Icon size={14} className="text-[#009DDC]" /> {label}
                      </label>

                      {isEditing ? (
                        <input
                          type={key === "dateOfBirth" ? "date" : "text"}
                          value={userData[key]}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (key === "phoneNumber")
                              val = val.replace(/\D/g, "").slice(0, 11);
                            setUserData({ ...userData, [key]: val });
                          }}
                          className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-[#009DDC] dark:text-white outline-none transition-all font-semibold"
                        />
                      ) : (
                        <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30">
                          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            {userData[key] || "---"}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Address Section (Commented Out) */}
                {/*
                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 mb-4 block">
                    Registered Address
                  </label>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 text-gray-700 dark:text-gray-300 font-bold border border-blue-100/50 dark:border-blue-900/20">
                    <MapPin size={18} className="text-[#009DDC]" />
                    {address}
                  </div>
                </div>
                */}

                {isEditing && (
                  <motion.button
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="w-full mt-10 cursor-pointer bg-[#009DDC] hover:bg-[#007AA8] text-white py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-4  border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={20} /> Save Changes
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
