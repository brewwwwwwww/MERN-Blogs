import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios"
import Swal from "sweetalert2"
import { json, useParams } from "react-router-dom";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const EditBlog = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug:""
  });
  
  const { slug } = useParams()

  const {title, author} = state

  const [content, setContent] = useState("") 

  const submitContent = (e) => {
    setContent(e)
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blog/${slug}`)
    .then(response => {
      const {title, content, author, slug} = response.data
      setState({...state, title, author, slug})
      setContent(content)
    })
    .catch(err => alert(err))
  }, [])
  
  const showUpdateForm = () => (
    <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            style={{border: "1px solid #666"}}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="Update" className="btn btn-primary" />
      </form>
  )

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault()
    axios.put(`${import.meta.env.VITE_API_URL}/blog/${slug}`, {title, content, author})
    .then(response => {
      Swal.fire({
        title: "Good job!",
        text: "Update Success!",
        icon: "success"
      });
      const {title, content, author, slug} = response.data
      setState({...state, title, author, slug})
      setContent(content)
    })
    .catch(err => {
        alert(err)
    })
  }

  return (
    <div className="container p-5">
      <Navbar />
      <h1>Edit Blog</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditBlog;
