import React from 'react'
import style from "./Register.module.css"
import Com from "../../assets/Smartcare.com.png"
import { Link } from 'react-router-dom';

export default function Register() {
  return (
   <>
   <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
  <div className="text-center mb-8 sm:mb-16">
    <Link to="/"><img src={Com} alt="logo" className="mt-[-20px] w-35 inline-block top-3" />
    </Link>
    <h4 className="text-slate-600 text-base mt-2">Sign up into your account</h4>
  </div>
  <form>
    <div className="grid sm:grid-cols-2 gap-8">
      <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">First Name</label>
        <input name="name" type="text" className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
      </div>
      <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">Last Name</label>
        <input name="lname" type="text" className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
      </div>
      <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
        <input name="email" type="text" className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
      </div>
      <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">Mobile No.</label>
        <input name="number" type="number" className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
      </div>
      <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
        <input name="password" type="password" className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
      </div>
      <div>
        <label className="text-slate-900 text-sm font-medium mb-2 block">Confirm Password</label>
        <input name="cpassword" type="password" className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
      </div>
    </div>
    <div className="mt-12">
      <button type="button" className="mx-auto block min-w-32 py-2 px-6 text-md font-medium tracking-wider rounded-md text-white bg-[#009DDC] hover:bg-blue-700 focus:outline-none cursor-pointer">
        Sign up
      </button>
    </div>
  </form>
</div>

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   </>
  )
}
