import React, { useState } from "react"
import { Mail, Phone, MapPin, User, LogOut, Edit2 } from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, San Francisco, CA 94102, United States",
  }

  const handleLogout = () => {
    console.log("Logging out...")
    alert("Logged out successfully!")
  }

  const handleEditProfile = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-6 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
            My Account
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 md:px-6 py-12">
        {/* Profile Card */}
        <div className="mb-8 rounded-lg bg-white dark:bg-gray-800 p-6 md:p-8 shadow transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-900 transition-colors duration-300">
                <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                {userData.name}
              </h2>
              <div className="mb-4 flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-300 transition-colors duration-300">
                <Mail className="h-4 w-4" />
                <span>{userData.email}</span>
              </div>
              <button
                onClick={handleEditProfile}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                <Edit2 className="h-4 w-4" />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-colors duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                Personal Information
              </h3>
              <button
                onClick={handleEditProfile}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 transition-colors duration-300">
                  <User className="h-4 w-4" />
                  Full Name
                </div>
                <p className="text-gray-800 dark:text-gray-200 transition-colors duration-300">{userData.name}</p>
              </div>

              {/* Email */}
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 transition-colors duration-300">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
                <p className="text-gray-800 dark:text-gray-200 transition-colors duration-300">{userData.email}</p>
              </div>

              {/* Phone */}
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 transition-colors duration-300">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </div>
                <p className="text-gray-800 dark:text-gray-200 transition-colors duration-300">{userData.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-colors duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                Shipping Address
              </h3>
              <button
                onClick={handleEditProfile}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 transition-colors duration-300">
                <MapPin className="h-4 w-4" />
                Address
              </div>
              <p className="text-gray-800 dark:text-gray-200 transition-colors duration-300">{userData.address}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
