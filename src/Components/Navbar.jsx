import React from "react";
import { FaGlobeEurope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../reducers/authReducer";

function Navbar() {
  const navigate = useNavigate();
  // const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    // { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    ...(token
      ? [
        {name : 'my Profile', path: '/profile'},
          { name: "My Blog", path: "/myblogs" },
          { name: "Create Blog", path: "/createblog" },
          {
            name: "Logout",
            callback: () => {
              localStorage.removeItem("token");
              dispatch(clearUser())
              navigate("/"); // Explicit redirect to login
            },
          },
        ]
      : [{ name: "Login", path: "/login" }]),
  ];

  return (
    <nav className="px-8 py-5 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <FaGlobeEurope className="text-2xl" />
        <span className="text-xl font-semibold tracking-tight">BlogSphere</span>
      </div>

      {/* Navigation Links */}
      <div className="uppercase hidden sm:flex tracking-tight font-semibold text-sm  items-center gap-4">
        {navLinks.map((item, index) =>
          item.callback ? (
            <button
              key={index}
              onClick={item.callback}
              className="hover:text-zinc-500 uppercase transition duration-300"
            >
              {item.name}
            </button>
          ) : (
            <Link
              key={index}
              to={item.path}
              className="hover:text-zinc-500 uppercase transition duration-300"
            >
              {item.name}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
