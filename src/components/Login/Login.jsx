import React from 'react'
import style from "./Login.module.css"
import loginpic from "../../assets/LoginImage.png"
export default function Login() {
  return (
   <>
   <div className="min-h-screen flex fle-col items-center justify-center mt-[-25px]">
  <div className="py-6 px-4">
    <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
      <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
        <form className="space-y-6">
          <div className="mb-12">
            <h1 className="text-[#009DDC]  text-3xl font-semibold">Sign in</h1>
            <p className="text-slate-600 text-[15px] mt-6 leading-relaxed">Log in and discover how SmartCare keeps you and your loved ones protected.</p>
          </div>
          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
            <div className="relative flex items-center">
              <input name="Email" type="email" required className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter Email" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                <circle cx={10} cy={7} r={6} data-original="#000000" />
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000" />
              </svg>
            </div>
          </div>
          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input name="password" type="password" required className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-[#009DDC] focus:ring-blue-500 border-slate-300 rounded" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="jajvascript:void(0);" className="text-[#009DDC] hover:underline font-medium">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="!mt-12">
            <button type="button" className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-[#009DDC] hover:bg-blue-700 focus:outline-none cursor-pointer">
              Sign in
            </button>
            <p className="text-sm !mt-6 text-center text-slate-600">Don't have an account <a href="javascript:void(0);" className="text-[#009DDC] font-medium hover:underline ml-1 whitespace-nowrap">Register here</a></p>
          </div>
        </form>
      </div>
      <div className="max-lg:mt-8">
        <img src={loginpic} className="w-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover" alt="login img" />
      </div>
    </div>
  </div>
</div>

   </>
  )
}
