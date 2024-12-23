import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter, FaGlobeEurope } from "react-icons/fa";
import axios from "../utils/Axios";



function Login() {
  const [socialMediaIcons] = useState([
    { Icon: FcGoogle, text: "Continue with Google" },
    { Icon: FaFacebookF, text: "Continue with Facebook" },
    { Icon: FaTwitter, text: "Continue with Twitter" },
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem('userId', response.data.user._id)
      navigate("/"); // Navigate to homepage
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="p-4">
      <nav className="p-4 flex uppercase tracking-tight line-clamp-1 items-center justify-between text-sm font-semibold">
        <Link to="/" className="flex items-center gap-1">
          <IoIosArrowBack className="text-2xl" /> Back
        </Link>
        <Link to="/signup">Create an Account</Link>
      </nav>
      <main className="w-full mt-8 md:h-[78vh] flex items-center justify-center gap-7 flex-col">
        <FaGlobeEurope className="text-4xl" />
        <h1 className="font-semibold text-2xl capitalize">
          Login into BlogSphere
        </h1>
        <div className="w-full md:w-[70%] flex flex-col md:flex-row">
          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="w-full md:w-1/2 py-2 px-6 md:px-12 relative border-b md:border-r border-zinc-300"
          >
            <span className="hidden md:block absolute bg-zinc-100 top-1/2 -translate-y-[100%] text-zinc-500 -right-2">
              or
            </span>
            <div className="flex flex-col border-b border-zinc-900 py-3 gap-3">
              <label
                className="tracking-tight text-xs text-zinc-600"
                htmlFor="email"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none border-none"
                placeholder="name@example.com"
                aria-label="Email Address"
                required
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
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none border-none"
                placeholder="password"
                aria-label="Password"
                required
              />
            </div>
            <button
              className="w-full py-3 bg-zinc-900 text-white mt-6 tracking-tight text-sm font-semibold hover:bg-gray-700 transition duration-300 ease-in-out"
              type="submit"
            >
              LOGIN
            </button>
          </form>
          {/* Social Media Buttons */}
          <div className="w-full md:w-1/2 py-8 px-6 md:px-12 relative flex flex-col gap-4">
            {socialMediaIcons.map(({ Icon, text }, index) => (
              <button
                key={index}
                className="flex items-center border border-zinc-800 w-full text-sm font-semibold px-8 py-4 gap-16 hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                <Icon className="text-2xl" />
                {text}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs">
          Secure Login with reCAPTCHA subject to Google
        </p>
      </main>
    </div>
  );
}

export default Login;
