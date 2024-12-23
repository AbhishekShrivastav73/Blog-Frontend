import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blog from "../Components/Blog";
import Comments from "../Components/Comments";
import { useSelector } from "react-redux";

function PostDetails() {
  const { id } = useParams();
  console.log(id);
  const [blog, setBlog] = useState();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${id}`
        );
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch post!");
      }
    };

    fetchPosts();
  }, [id]); // Add id as a dependency to ensure correct behavior

  return (
    blog && (
      <div>
        <Navbar />

        <div className="p-4 w-full mt-4 md:w-[80%] mx-auto flex flex-col items-cente gap-4">
          <h1 className="w-full text-3xl md:text-7xl font-bold">
            {blog.title}
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <img src={blog.author.profilePicture} alt="" />
            <span className="font-semibold text-zinc-700 md:text-lg">
              {blog.author.username}
            </span>
            -<span>{blog.createdAt}</span>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            {blog.categories.map((items, idx) => {
              return (
                <span
                  key={idx}
                  className="inline-block bg-zinc-400 text-xs px-4 py-1 font-semibold rounded-full text-white"
                >
                  {items}
                </span>
              );
            })}
          </div>

          <img
            className="md:w-1/2 w-full mx-auto"
            src={`http://localhost:3000/uploads/${blog.image}`}
            alt=""
          />

          <div
            className="mt-8 text-xl text-gray-9 00"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="flex justify-end mt-4">
            <button className="py-2 px-4 text-white bg-zinc-900 hover:bg-gray-700 rounded-md">
              Share
            </button>
          </div>
          <Comments postId={id}/>
        </div>
      </div>
    )
  );
}

export default PostDetails;
