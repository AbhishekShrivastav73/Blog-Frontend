import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Blog from "../Components/Blog";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const getUserProfile = async () => {
    if (token) {
      const response = await axios.get(
        `http://localhost:3000/api/auth/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(response);
      setUser(response.data);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    user && (
      <div>
        <Navbar />

        <div className="px-8 flex flex-col gap-1 items-start">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-lg font-semibold">{user.bio}</p>
          <div className="flex items-center gap-5 text-sm">
            <p>Email : {user.email}</p>
            <p>Joined : {user.createdAt}</p>
          </div>
          <div className="flex items-center mt-2 gap-3">
            <div className="border border-zinc-900 rounded-xl px-4 py-2">
              Followers{" "}
              <span className="font-semibold"> {user.followers.length} </span>
            </div>
            <div className="border border-zinc-900 rounded-xl px-4 py-2">
              Following{" "}
              <span className="font-semibold"> {user.following.length} </span>
            </div>
          </div>
          {/* <hr  className="border border-zinc-400 mt-3 w-1/3"/> */}
          <h2 className="text-2xl font-semibold  my-3">Posts</h2>
          <div className="flex gap-4 flex-wrap">
            {user.posts.map((post) => {
              return <Blog key={post._id} post={post} />;
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;
