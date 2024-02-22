import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from 'html-react-parser'

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Confirm to delete ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/blog/${slug}`)
      .then((response) => {
        Swal.fire({
          title: "Delete Complete !",
          icon: "success",
        });
        fetchData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container p-5">
      <Navbar />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className="pt-3">{parse(blog.content.substring(0, 300))}</div>
            <p className="text-muted">
              Author : {blog.author} , Date :{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
            <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>Edit</Link>
            <button
              className="btn btn-outline-danger"
              onClick={() => confirmDelete(blog.slug)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Home;
