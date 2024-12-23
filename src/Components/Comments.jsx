import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch comments for the specific post
    const fetchComments = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comment/${id}`
        );
        console.log(response);
        setComments(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch post!");
      }
    };

    fetchComments(postId);
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      if (localStorage.getItem("token")) {
        const response = await axios.post(
          `http://localhost:3000/api/comment/${postId}`,
          { postId, content: newComment },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, // Add token for authenticated requests
          }
        );
        setComments([...comments, response.data]); // Add new comment to the list
        setNewComment(""); // Clear input field
      }else{
          navigate('/login')
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add comment.");
    }
  };

  return (
    comments && (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 border rounded">
              <p className="text-gray-700">{comment.content}</p>
              <span className="text-sm text-gray-500">
                - {comment.user.username || "Anonymous"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    )
  );
}

export default Comments;
