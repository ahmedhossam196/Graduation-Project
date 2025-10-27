import React from 'react';
import style from "./Home.module.css"; // if you plan to use it later
import B_Home from "../../assets/BraceletHomePage.jpeg"
export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-between px-10 py-16 md:px-20">
      {/* Left Text Box */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 md:w-1/2 border-t-4 border-[#009DDC]">
        <h2 className="text-3xl font-bold text-[#009DDC] mb-4">About Us</h2>

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          At <span className="font-semibold text-[#009DDC]">SmartCare</span>, we believe that technology should care for people — 
          not just connect them. That’s why we created the <span className="font-semibold">Linko Bracelet</span>, 
          a smart health companion designed to support you and your loved ones every single day.
        </p>

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Our mission is simple: to make health monitoring easier, safer, and more reliable.
          Linko reminds you to take your medications on time, tracks your vital signs,
          and instantly alerts family members or caregivers in case of emergency.
        </p>

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          We are a passionate team of engineers and innovators from 
          <span className="font-semibold"> 6th of October City, Egypt</span>, working to bring healthcare closer 
          to people’s hands through smart, reliable technology.
        </p>

        <p className="text-gray-700 text-base leading-relaxed">
          <span className="font-semibold text-[#009DDC]">We’re here to help people</span> — to make life safer, healthier, 
          and more connected. Because your well-being is our mission.
        </p>
      </div>

      {/* Right Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={B_Home} 
          alt="Linko Bracelet"
          className="w-[400px] md:w-[500px] object-contain rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}
