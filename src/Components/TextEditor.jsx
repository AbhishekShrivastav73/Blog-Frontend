import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Token for authentication

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image file
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categories", categories);
    formData.append("tags", tags);
    if (image) {
      formData.append("image", image); // Append the image file
    }

    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/api/post", // Your backend endpoint for post creation
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the correct content type for file upload
              Authorization: `Bearer ${token}`, // Add token for authentication
            },
          }
        );
        console.log("Post created successfully:", response.data);
        navigate("/"); // Navigate to homepage after post creation
      } else {
        navigate("/login"); // Navigate to login page if token is not found
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-8">
      <form
        className="flex h-fit flex-col md:flex-row gap-4 justify-between"
        onSubmit={handlePostSubmit}
      >
        <div className="w-full h-fit flex flex-col  gap-4 md:w-3/4 p-2">
          <div>
            <label className="font-bold text-xl mr-2">Title:</label>
            <input
              className="border border-zinc-900 p-2 rounded-xl"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-bold text-xl">Content:</label>
            <ReactQuill
              //   className="h-[300px]"
              value={content}
              onChange={setContent}
              theme="snow"
              placeholder="Write something amazing..."
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 md:w-1/4 p-4">
          <div>
            <label className="text-blue-400 font-bold text-xl">
              Categories (comma separated):
            </label>
            <input
              className="border border-zinc-900 p-2 rounded-xl mt-2"
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-blue-400 font-bold text-xl">
              Tags (comma separated):
            </label>
            <input
              className="border border-zinc-900 p-2 rounded-xl mt-2"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xl text-blue-400 font-bold">Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button
            className="px-4 py-2 text-white font-bold bg-green-400 rounded-lg"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
