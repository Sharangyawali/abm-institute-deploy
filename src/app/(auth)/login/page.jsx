"use client";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const rgexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result = await fetch(`/api/users/auth/login`, {
      method: "post",
      body: JSON.stringify({ email: data.email, password: data.password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      toast.error(result.message);
    } else {
      if (result.role === "Admin") {
        router.push("/admin/dashboard");
      } else if (result.role === "FrontDesk") {
        router.push("/front-desk/dashboard");
      } else if (result.role === "Accounting") {
        router.push("/accountant/dashboard");
      } else if (result.role === "Teacher") {
        router.push("/teacher/attendance");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="max-w-md text-black w-full p-6 bg-white rounded-md shadow-md h-[400px] flex flex-col justify-evenly items-center">
            <h2 className="text-2xl text-black font-bold mb-4 w-[100%] text-center ">
              Login
            </h2>
            <form className="w-[100%] flex flex-col justify-evenly items-center">
              <div className="mb-4 w-[80%]">
                <label
                  htmlFor="email"
                  className="block  text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="mt-1 text-black p-2 w-full border-[#969696] border-[2px] rounded-md"
                />
              </div>
              <div className="mb-4 relative w-[80%]">
                <label
                  htmlFor="password"
                  className="block  text-sm  font-medium text-gray-600"
                >
                  Password
                </label>
                <div className="flex border rounded-md mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="p-2 text-black border-[#969696] w-full border-[2px] rounded-md"
                  />
                  <div
                    className="absolute right-3 bottom-3 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              <div className="w-[100%] flex justify-center items-center mt-[20px]">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l w-[80%]"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </form>
            <p className="p-2">
              Don't have an Account?
              <Link
                href="/register"
                className="px-2 text-blue-500 hover:text-red-400"
              >
                Register
              </Link>
            </p>
        </div>
      )}
    </div>
  );
};

export default Login;
