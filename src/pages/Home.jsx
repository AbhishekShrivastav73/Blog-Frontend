import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/postReducer";
import { fetchUser } from "../reducers/authReducer";
import Navbar from "../Components/Navbar";
import Blog from "../Components/Blog";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  // console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUser(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <div>
      <Navbar user={user} />
      <h1 className="text-center font-bold text-xl my-8">
        EXPLORE LATEST BLOGS.
      </h1>
      <div className="w-full flex flex-wrap gap-6 p-6">
        {posts && posts.map((post) => <Blog key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Home;
