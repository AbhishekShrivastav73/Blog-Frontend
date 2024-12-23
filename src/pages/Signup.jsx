import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { IoIosArrowBack } from "react-icons/io";
import { FaGlobeEurope } from "react-icons/fa";
import axios from "../utils/Axios";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize navigate

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await axios.post("/auth/signup", data); // Corrected endpoint name
      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem("userId", response.data.newUser._id); 
      navigate("/"); // Navigate to homepage
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="p-4">
      <nav className="p-4 flex uppercase tracking-tight line-clamp-1 items-center justify-between text-sm font-semibold">
        <Link to="/" className="flex items-center gap-1">
          <IoIosArrowBack className="text-2xl" />
          Back
        </Link>
        <Link to="/login">LOG IN</Link>
      </nav>
      <main className="w-full mt-8 md:h-[78vh] flex items-center justify-center gap-4 flex-col">
        <FaGlobeEurope className="text-4xl" />
        <h1 className="font-semibold text-2xl capitalize">
          Create your account
        </h1>
        <form
          onSubmit={handleSignin}
          className="w-full md:w-[40%] py-2 px-6 md:px-12 relative"
        >
          <div className="flex flex-col border-b border-zinc-900 py-3 gap-3">
            <label
              className="tracking-tight text-xs text-zinc-600"
              htmlFor="username"
            >
              USERNAME
            </label>
            <input
              onChange={(e) => setData({ ...data, username: e.target.value })}
              type="text"
              className="bg-transparent outline-none border-none"
              placeholder="username"
              name="username"
            />
          </div>
          <div className="flex flex-col border-b border-zinc-900 py-3 gap-3">
            <label
              className="tracking-tight text-xs text-zinc-600"
              htmlFor="email"
            >
              EMAIL ADDRESS
            </label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="text"
              className="bg-transparent outline-none border-none"
              placeholder="name@example.com"
              name="email"
            />
          </div>
          <div className="flex flex-col border-b border-zinc-900 py-3 gap-3">
            <label
              className="tracking-tight text-xs text-zinc-600"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              className="bg-transparent outline-none border-none"
              placeholder="password"
            />
          </div>
          <button
            className="w-full py-3 bg-zinc-900 text-white mt-6 tracking-tight text-sm font-semibold hover:bg-gray-700 transition duration-300 ease-in-out"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;
