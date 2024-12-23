import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Myblog from "./pages/Myblog";
import PostDetails from "./pages/PostDetails";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="w-full min-h-screen bg-zinc-100">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/myblogs" element={<Myblog />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/createblog" element={<CreateBlog/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
