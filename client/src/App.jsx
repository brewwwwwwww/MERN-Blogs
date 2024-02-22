import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"
import Form from './components/Form'
import Home from './components/Home'
import Blog from './components/Blog'
import EditBlog from './components/EditBlog'
import Login from './components/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Form/>}></Route>
        <Route path='/blog/:slug' element={<Blog/>}></Route>
        <Route path='/blog/edit/:slug' element={<EditBlog/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App