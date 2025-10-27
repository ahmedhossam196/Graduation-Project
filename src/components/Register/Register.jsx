import React from 'react'
import style from "./Register.module.css"
import Com from "../../assets/Smartcare.com.png"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';



export default function Register() {

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  gender: z.enum(["Male", "Female"], {
    message: "You have to choose the gender",
  }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .refine(
      (date) => {
        const userDate = new Date(date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return userDate < now;
      },
      { message: "Date of birth can't be in the future" }
    ),
  phoneNumber: z
    .string()
    .regex(/^01[0-2,5]\d{8}$/, "Invalid Egyptian phone number (must be 11 digits starting with 010, 011, 012, or 015)"),
});




const form = useForm({
defaultValues:{
firstName: "",
lastName: "",
email: "",
password: "",
gender: "",
dateOfBirth: "",
phoneNumber: ""

},
resolver : zodResolver(schema)
})
let {register , handleSubmit , formState} = form;

function handleRegister(data){
  console.log(data);
  axios.post(`http://smartbracelet.runasp.net/api/auth/signup`, data).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
  

}

  return (
   <>
   <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
  <div className="text-center  sm:mb-16">
    <Link to="/"><img src={Com} alt="logo" className="mt-[-20px] w-35 inline-block top-3" />
    </Link>
    <h4 className="text-slate-600 text-base mt-2">Sign up into your account</h4>
  </div>
  <form className='mt-[-40px]' onSubmit={handleSubmit(handleRegister)}  >
  <div className="grid sm:grid-cols-2 gap-8">
    {/* First Name */}
    <div>
      <label htmlFor="firstName" className="text-slate-900 text-sm font-medium mb-2 block">
        First Name
      </label>

      <input
        id="firstName"
        {...register("firstName")}
        type="text"
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        placeholder="Enter name"
      />
      {formState.errors.firstName && formState.touchedFields.firstName? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.firstName.message }</p>:""} 
    </div>

    {/* Last Name */}
    <div>
      <label htmlFor="lastName" className="text-slate-900 text-sm font-medium mb-2 block">
        Last Name
      </label>
      <input
        id="lastName"
        {...register("lastName")}
        type="text"
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        placeholder="Enter last name"
      />
            {formState.errors.lastName && formState.touchedFields.lastName ? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.lastName.message }</p>:""} 

    </div>

    {/* Email */}
    <div>
      <label htmlFor="email" className="text-slate-900 text-sm font-medium mb-2 block">
        Email Id
      </label>
      <input
        id="email"
        {...register("email")}
        type="email"
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        placeholder="Enter email"
      />
            {formState.errors.email && formState.touchedFields.email ? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.email.message }</p>:""} 

    </div>

    {/* Mobile */}
    <div>
      <label htmlFor="phoneNumber" className="text-slate-900 text-sm font-medium mb-2 block">
        Mobile No.
      </label>
      <input
        id="phoneNumber"
        {...register("phoneNumber")}
        type="text"
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        placeholder="Enter mobile number"
      />
            {formState.errors.phoneNumber && formState.touchedFields.phoneNumber? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.phoneNumber.message }</p>:""} 

    </div>

    {/* Password */}
    <div>
      <label htmlFor="password" className="text-slate-900 text-sm font-medium mb-2 block">
        Password
      </label>
      <input
        id="password"
        {...register("password")}
        type="password"
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        placeholder="Enter password"
      />
                  {formState.errors.password && formState.touchedFields.password? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.password.message }</p>:""} 

    </div>

    {/* Birthday */}
    <div>
      <label htmlFor="dateOfBirth" className="text-slate-900 text-sm font-medium mb-2 block">
        BirthDay
      </label>
      <input
        id="dateOfBirth"
        {...register("dateOfBirth")}
        type="date"
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
      />
                  {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.dateOfBirth.message }</p>:""} 

    </div>

    {/* Gender */}
    <div className="sm:col-span-2">
      <label htmlFor="gender" className="text-slate-900 text-sm font-medium mb-2 block">
        Gender
      </label>
      <select
        id="gender"
        {...register("gender")}
        className="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
      >
        
        <option value="" disabled hidden>Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        {/* <option value="Other">Other</option> */}
      </select>
                  {formState.errors.gender && formState.touchedFields.gender? <p className='text-red-500 font-semibold text-center my-2'>{formState.errors.gender.message }</p>:""} 

    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-12">
    <button
      type="submit"
      className="mx-auto block min-w-32 py-2 px-6 text-md font-medium tracking-wider rounded-md text-white bg-[#009DDC] hover:bg-blue-700 focus:outline-none cursor-pointer"
    >
      Sign up
    </button>
  </div>
</form>
</div>
   </>
  )
}
