import React from "react";
import { Heart, Clock, Bell, MapPin, Radio } from "lucide-react";
import homeimg from "../../assets/Homeimg.jpeg"
const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            The Future of <span className="text-[#009DDC]">Care</span>
            <br />is on Your Wrist
          </h1>

          <p className="text-gray-500 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Monitor vital signs, track medication schedules, and ensure continuous
            safety with the LinkO SmartCare Bracelet.
          </p>

          <button className="bg-[#009DDC] text-white px-8 py-3 rounded-full font-semibold
                             hover:bg-[#0088c0] transition shadow-md">
            Explore Products
          </button>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-full max-w-[460px] rounded-3xl overflow-hidden shadow-lg">
            <img
              src={homeimg}
              alt="Smart Bracelet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE LINKO ================= */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose LinkO?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <Heart className="h-12 w-12 mx-auto text-[#009DDC]" />,
              title: "Health Monitoring",
              desc: "Track heart rate and vital signs in real-time to ensure well-being.",
            },
            {
              icon: <MapPin className="h-12 w-12 mx-auto text-[#009DDC]" />,
              title: "GPS Tracking",
              desc: "Know your loved ones' location anytime with precise GPS tracking.",
            },
            {
              icon: <Bell className="h-12 w-12 mx-auto text-[#009DDC]" />,
              title: "Emergency Alerts",
              desc: "Instant SOS notifications to caregivers during emergencies.",
            },
            {
              icon: <Clock className="h-12 w-12 mx-auto text-[#009DDC]" />,
              title: "Medication Reminders",
              desc: "Never miss a dose with smart medication reminders.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow
                         hover:shadow-xl transition"
            >
              {item.icon}
              <h3 className="text-lg font-semibold mt-4 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Step 1: Wear the Bracelet",
                desc: "Put on the LinkO bracelet comfortably and it starts monitoring automatically.",
              },
              {
                title: "Step 2: Monitor Health & Location",
                desc: "Track heart rate, activity, and GPS location in real-time.",
              },
              {
                title: "Step 3: Receive Alerts & Reminders",
                desc: "Get emergency alerts and medication reminders through the app.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow
                           hover:shadow-xl transition text-center"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
