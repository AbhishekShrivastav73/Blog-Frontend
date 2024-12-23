import React, { useState, useEffect } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Blog({ post }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Local state to manage likes for this specific post
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(
    post.likes.includes(localStorage.getItem("userId")) // Check if the user has already liked the post
  );

  // Fetch updated post data from the backend to ensure likes are correct
  const getUpdatedPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = response.data;
      setLikes(updatedPost.likes.length);
      setIsLiked(updatedPost.likes.includes(localStorage.getItem("userId")));
    } catch (error) {
      console.error("Error fetching updated post:", error);
    }
  };

  // Handle like/dislike functionality
  const handleLike = async (id) => {
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:3000/api/post/like/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the local state based on the response from the backend
        const { likes: updatedLikes, liked } = response.data;
        setLikes(updatedLikes);
        setIsLiked(liked);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Fetch updated post data when the component is mounted
  useEffect(() => {
    getUpdatedPost();
  }, []);

  return (
    <div className="sm:w-[300px] w-full md:w-[320px] lg:w-[380px] flex flex-col gap-1 justify-between p-4 rounded-3xl bg-zinc-200">
      <div>
        <img src={post.author.profilePicture} alt={post.author.username} />
        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {post.title}
        </h4>
        <div className="flex items-center gap-1 my-2 flex-wrap">
          {post?.categories.map((category, idx) => (
            <span
              key={idx}
              className="inline-block bg-zinc-400 text-xs px-4 py-1 rounded-full text-white"
            >
              {category}
            </span>
          ))}
        </div>
      </div>    
      <div>
        <img
          className="h-[30vh] w-full"
          src={`http://localhost:3000/uploads/${post.image}`}
          alt={post.title}
        />
        <span className="text-gray-500 text-xs">
          Written by {post.author.username} on {post.createdAt}
        </span>
        <div className="flex items-center gap-2 text-sm mt-2">
          <button
            onClick={() => handleLike(post._id)}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 ${
              isLiked ? "bg-red-300" : "bg-zinc-300"
            }`}
          >
            {isLiked ? <SlDislike /> : <SlLike />}
            {isLiked ? "Unlike" : "Like"}
          </button>
          <button className="flex items-center gap-2 rounded-2xl bg-zinc-300 px-4 py-2">
            <FaRegCommentAlt />
            {post.comments.length}
          </button>
          <Link
            to={`/post/${post._id}`}
            className="flex items-center gap-2 bg-zinc-700 px-3 py-2 text-xs text-zinc-50 font-bold rounded-2xl"
          >
            Read Blog
            <FaArrowUpRightFromSquare />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;
