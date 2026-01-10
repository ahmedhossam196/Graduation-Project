import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, MapPin, Activity, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import braceletImg from "../../assets/bracelet-mockup.png";
import medicationImg from "../../assets/medication.png";
import locationImg from "../../assets/location.png";
import fallDetectionImg from "../../assets/Detect.png";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 50 },
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToProducts = () => navigate("/products");

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 dark:from-[#009DDC]/20 dark:via-gray-900 dark:to-gray-900"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight"
            >
              Empowering <br />
              <span className="text-[#009DDC]">Independence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-xl"
            >
              LinkO is more than a bracelet—it's a lifeline. Designed for the elderly, 
              delivering safety through real-time tracking, fall detection, and essential health reminders.
            </motion.p>

            <motion.div
              className="flex gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={goToProducts}
                className="bg-[#009DDC] text-white px-9 py-4 rounded-full font-semibold hover:scale-105 transition cursor-pointer"
              >
                View Collection
              </button>
              <button
                onClick={openModal}
                className="border border-gray-300 dark:border-gray-600 px-9 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                Our Mission
              </button>
            </motion.div>
          </motion.div>

          {/* INFINITY Float & Scale animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              y: [0, -30, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              opacity: { duration: 1.2 },
              y: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }}
            className="relative flex justify-center"
          >
            <motion.div 
              animate={{ opacity: [0.4, 0.2, 0.4], scale: [1, 0.8, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              className="absolute w-[400px] h-[400px] bg-[#009DDC]/30 rounded-full blur-3xl"
            ></motion.div>
            
            <img
              src={braceletImg}
              alt="LinkO Smart Bracelet"
              className="relative w-[360px] drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES TITLE ================= */}
      <div className="pt-20 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold"
          >
            Simple tools to keep you safe
          </motion.h2>
          <div className="w-50 h-1.5 bg-[#009DDC] mx-auto mt-4 rounded-full transition-all duration-500 ease-out group-hover:w-32"></div>
      </div>

      {/* ================= MEDICATION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16 items-center">
        <motion.div
          className="flex-1 space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 text-[#009DDC]">
            <BellRing size={64} />
          </div>
          <h3 className="text-3xl font-bold">Health & Medication</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Never miss a dose. Our gentle vibration alerts help maintain critical health routines 
            without the stress of remembering.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src={medicationImg} alt="Medication" className="w-full h-auto" />
        </motion.div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row-reverse gap-16 items-center">
        <motion.div
          className="flex-1 space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 text-[#009DDC]">
            <MapPin size={64} />
          </div>
          <h3 className="text-3xl font-bold">Live Tracking</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Keep track of your loved ones with precision GPS. Know they are safe at home or 
            find them quickly if they wander.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src={locationImg} alt="Location" className="w-full h-auto" />
        </motion.div>
      </section>

      {/* ================= FALL DETECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16 items-center">
        <motion.div
          className="flex-1 space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 text-[#009DDC]">
            <Activity size={64} />
          </div>
          <h3 className="text-3xl font-bold">Instant Fall Response</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Using advanced AI sensors, LinkO detects sudden falls and notifies emergency 
            contacts immediately when seconds count.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src={fallDetectionImg} alt="Fall Detection" className="w-full h-auto" />
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-gray-50 dark:bg-gray-800/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to provide better care?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto px-6">
            Join thousands of families who trust LinkO to protect their parents and grandparents every day.
          </p>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0,157,220,0.4)" }}
            onClick={goToProducts}
            className="bg-[#009DDC] text-white px-12 py-5 rounded-full font-bold text-xl cursor-pointer shadow-lg"
          >
            Get LinkO Today
          </motion.button>
        </motion.div>
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl max-w-3xl w-full relative shadow-2xl"
            >
              <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 cursor-pointer">
                <X size={32} />
              </button>
              
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
  <p>
    <strong className="text-gray-900 dark:text-white">LinkO</strong> was born from a simple, 
    unwavering belief: that technology should serve our most vulnerable, not overwhelm them. 
    We recognized that for many families, the safety of elderly loved ones is a constant 
    source of worry that affects everyone's quality of life.
  </p>
  
  <p>
    Our team has meticulously combined medical-grade sensors with an intuitive, 
    human-centered interface. We don’t just track data; we bridge the gap between 
    independence and safety. By providing real-time insights and instant emergency 
    alerts, we ensure that growing older doesn't mean living in fear or losing the 
    freedom to move.
  </p>
  
  <p>
    Whether it’s a daughter checking on her father from miles away, or a husband 
    ensuring his wife never misses a critical medication, LinkO is there. We are 
    committed to constant innovation, ensuring that every senior can live with 
    dignity and every caregiver can breathe a little easier.
  </p>

  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
    <p className="italic font-medium text-[#009DDC]">
      "Our mission is to ensure that no one ever has to feel alone, even when they are living independently."
    </p>
  </div>
</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;