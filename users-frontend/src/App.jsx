import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router'
import BlogDetails from './pages/BlogDetails'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
