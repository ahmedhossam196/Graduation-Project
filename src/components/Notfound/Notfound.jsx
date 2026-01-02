import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, Home, ArrowLeft, Activity, Lock } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated Icon Section */}
        <div className="relative mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl relative z-10"
          >
            {/* تم تغيير الأيقونة لدرع تنبيه */}
            <ShieldAlert className="h-20 w-20 text-[#009DDC]" />
          </motion.div>
          
          {/* Animated "Security Scan" Effect */}
          <motion.div 
            animate={{ 
              y: [-20, 100],
              opacity: [0, 1, 0] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-32 h-1 bg-[#009DDC] blur-sm z-20"
          />
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-7xl font-black text-gray-800 dark:text-gray-100 mb-2">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#009DDC] mb-4">
            Security Breach: Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto mb-10">
            The page you are looking for is outside our secure zone. 
            Don't worry, Linko is here to guide you back to safety.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#009DDC] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform active:scale-95"
          >
            <Home size={20} />
            Secure Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center cursor-pointer gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-xl font-bold shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Decorative Footer Element */}
        <div className="mt-16 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-600">
          <Lock size={16} />
          <span className="text-sm font-medium tracking-widest uppercase">Linko Secure Environment</span>
        </div>
      </div>
    </div>
  );
}