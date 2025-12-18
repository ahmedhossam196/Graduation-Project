import React from "react";
import { Link } from "react-router-dom";
import bracelet from "../../assets/bracelet.jpg";
import { Heart, MapPin, Clock, Bell } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext"; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#009DDC] dark:text-[#009DDC] mb-4">
          Welcome to Linko
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-6">
          Linko is a smart bracelet designed for seniors to monitor their
          health, track their location, and get instant emergency support. Stay
          safe, healthy, and connected with our innovative wearable technology.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#009DDC] text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition"
        >
          Browse Products
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center">
          Why Choose Linko?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition">
            <Heart className="mx-auto h-12 w-12 text-[#009DDC] mb-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Health Monitoring</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Track heart rate and vital signs in real-time to ensure well-being.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition">
            <MapPin className="mx-auto h-12 w-12 text-[#009DDC] mb-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">GPS Tracking</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Know your loved ones' location anytime with precise GPS tracking.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition">
            <Bell className="mx-auto h-12 w-12 text-[#009DDC] mb-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Emergency Alerts</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Instant SOS notifications to family and caregivers in emergencies.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition">
            <Clock className="mx-auto h-12 w-12 text-[#009DDC] mb-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Medication Reminders</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Schedule reminders to take medications on time, every day.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center">
          How It Works
        </h2>
        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition text-center">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Step 1: Wear the Bracelet
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Put on the Linko bracelet comfortably on the wrist. It will start monitoring automatically.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition text-center">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Step 2: Monitor Health & Location
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              The bracelet tracks heart rate, daily activity, and GPS location to keep seniors safe.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition text-center">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Step 3: Receive Alerts & Reminders
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Get notifications for emergencies and medication reminders instantly on the connected app.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {/* <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((product) => (
            <div
              key={product}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition"
            >
              <img
                src={bracelet}
                alt="Product"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Linko Bracelet
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mb-2">Health Monitoring Device</p>
              <span className="text-gray-800 dark:text-gray-100 font-bold">120 LE</span>
            </div>
          ))}
        </div>
      </section> */}
    </div>)
    }

    