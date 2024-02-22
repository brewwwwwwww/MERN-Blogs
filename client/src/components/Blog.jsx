import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import parse from "html-react-parser";

const Blog = () => {
  const [blog, setBlog] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/blog/${slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="container p-5">
      <Navbar />
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <div>{parse(blog.content)}</div>
          <p className="text-muted">
            Author: {blog.author}, Date:{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
