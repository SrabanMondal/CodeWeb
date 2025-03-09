//import Link from "next/link"
//import { Flame } from "lucide-react"
"use client"
import { login } from "@/libs/apis/client";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const handleLogin = async () => {
        const res = await login(email, password)
        if (res) {
            localStorage.setItem('token',res)
            window.location.href = '/dashboard'
        } else {
            alert('Invalid email or password')
        }
    }
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side - Green section */}
      <div className="relative w-[60vw] h-full bg-white">
      <div style={{borderBottomRightRadius:'350px 450px',borderTopRightRadius:'350px 450px'}} className="w-full relative overflow-hidden h-full bg-emerald-700 text-white">
        <Image src={'/bg.webp'} alt="img" layout="fill"/>
       {/* 
       <div className="flex flex-col items-center justify-center px-12 text-center h-full">
          <div className="mb-6 flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
             
            </div>
            <h2 className="mt-2 text-2xl font-medium">blueflame</h2>
          </div>

          <h1 className="mb-4 text-4xl font-bold">Welcome Back!</h1>
          <p className="mb-12 text-lg">
            To stay connected with us
            <br />
            please login with your personal info
          </p>

          <button className="mb-16 w-64 rounded-full border-2 border-white py-3 font-medium transition hover:bg-white/10">
            SIGN IN
          </button>

          <div className="absolute bottom-6 text-xs font-light">CREATOR HERE | DIRECTOR HERE</div>
        </div>
         */} 
      </div>
      </div>
      {/* Right side - White section */}
      <div className="relative bg-[#0a0f1a] w-[40vw] h-full">
      <div   className="w-full h-full bg-white flex justify-center items-center">
        <div className="inset-0 flex flex-col items-center justify-center px-8 sm:px-12">
          <h1 className="mb-2 text-4xl font-bold text-[#121826]">Code Quiz</h1>
          <p className="mb-10 text-2xl text-[#121826]">Login in to your account to continue</p>

          <div className="w-full max-w-lg space-y-4">
            <div className="rounded-full bg-[#121826] px-6 py-3 border-[#00ccff]  border-2">
              <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email" className="w-full text-white  bg-[#121826] outline-none" />
            </div>

            <div className="rounded-full bg-[#121826] px-6 py-3 border-[#00ccff]  border-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent text-white outline-none "
              />
            </div>

           {/*
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
                */} 

            <button onClick={handleLogin} className="w-full rounded-full bg-[#1e2944] border-[#00ccff] border-2 text-[#fff] py-3 font-medium transition hover:bg-[#121826] cursor-pointer">
              LOG IN
            </button>
            {/*
            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/signup" className="font-medium text-emerald-700 hover:underline">
                sign up
              </Link>
            </div>*/}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

