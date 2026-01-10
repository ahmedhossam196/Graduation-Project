import React from "react";
import { motion } from "framer-motion";
import { BellRing, MapPin, Activity } from "lucide-react";
import braceletImg from "../../assets/bracelet-mockup.png";

// Section images
import medicationImg from "../../assets/medication.png";
import locationImg from "../../assets/location.jpg";
import fallDetectionImg from "../../assets/falldetection.png";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#009DDC]/20 via-white to-white dark:from-[#009DDC]/20 dark:via-gray-900 dark:to-gray-900"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Smart Care,
              <br />
              <span className="text-[#009DDC]">Anywhere</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              LinkO is a smart bracelet designed to protect elderly users through medication alerts,
              live location tracking, and instant fall detection.
            </p>

            <div className="flex gap-5">
              <button className="bg-[#009DDC] text-white px-9 py-4 rounded-full font-semibold hover:scale-105 transition">
                Browse Products
              </button>
              <button className="border border-gray-300 dark:border-gray-600 px-9 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[420px] h-[420px] bg-[#009DDC]/30 rounded-full blur-3xl"></div>
            <img
              src={braceletImg}
              alt="LinkO Smart Bracelet"
              className="relative w-[360px]"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= MEDICATION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-40 flex flex-col lg:flex-row gap-20 items-center">
        {/* Text */}
        <div className="flex-1 space-y-5">
          <div className="w-20 h-20 text-[#009DDC]">
            <BellRing />
          </div>
          <h3 className="text-3xl font-bold">Medication Reminders</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Gentle alerts notify users when it is time to take their medication, supporting safe daily routines.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img src={medicationImg} alt="Medication Reminders" className="w-full h-auto" />
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-40 flex flex-col lg:flex-row-reverse gap-20 items-center">
        {/* Text */}
        <div className="flex-1 space-y-5">
          <div className="w-20 h-20 text-[#009DDC]">
            <MapPin />
          </div>
          <h3 className="text-3xl font-bold">Live Location Tracking</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Real-time GPS tracking allows families to know where their loved ones are at all times.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img src={locationImg} alt="Live Location Tracking" className="w-full h-auto" />
        </div>
      </section>

      {/* ================= FALL DETECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-40 flex flex-col lg:flex-row gap-20 items-center">
        {/* Text */}
        <div className="flex-1 space-y-5">
          <div className="w-20 h-20 text-[#009DDC]">
            <Activity />
          </div>
          <h3 className="text-3xl font-bold">Fall Detection Alerts</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Automatic fall detection instantly sends alerts when abnormal movement is detected.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img src={fallDetectionImg} alt="Fall Detection Alerts" className="w-full h-auto" />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 text-center bg-gray-50 dark:bg-gray-800">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Simple. Reliable. Protective.
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-[#009DDC] text-white px-12 py-4 rounded-full font-semibold"
        >
          Get Started
        </motion.button>
      </section>
    </div>
  );
};

export default Home;
