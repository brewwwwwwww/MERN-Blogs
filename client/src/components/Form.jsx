import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const Form = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
  });

  const {title, author} = state
  
  const [content, setContent] = useState("") 

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e)
  }

  const submitForm = (e) => {
    e.preventDefault()
    // console.table({title, content, author})
    console.log(import.meta.env.VITE_API_URL)
    axios.post(`${import.meta.env.VITE_API_URL}/create`, {title, content, author})
    .then(response => {
      Swal.fire({
        title: "Good job!",
        text: "Success!",
        icon: "success"
      });
      setState({...state, title:"", author:""})
      setContent("")
    })
    .catch(err => {
      Swal.fire({
        title: "Fail!",
        text: err.response.data.error,
        icon: "error"
      });
    })
  }

  return (
    <div className="container p-5">
      <Navbar />
      <h1>Create Blog</h1>
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
            placeholder="Write your content"
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
        <input type="submit" value="save" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Form;
