import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Blog from "../Components/Blog";
import { fetchUser } from "../reducers/authReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Myblog() {
  const [posts, setposts] = useState([]);
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const getMyPosts = async () => {
    try {
      if(token){

        const response = await axios.get(
          `http://localhost:3000/api/post/myposts`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        console.log(response.data);
        setposts(response.data);
      }else{
        navigate('/login')
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    // dispatch(fetchUser());
    getMyPosts();
  }, []); // Empty dependency array to run once when component mounts

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-8 my-3">
        <h1 className="text-zinc-500 my-4 font-semibold italic  text-xl">Blogs created by you</h1>
        <div className="flex gap-4">

        {posts.map((post) => {
          return <Blog key={post._id} post={post} />;
        })}
        </div>
      </div>
    </div>
  );
}

export default Myblog;
