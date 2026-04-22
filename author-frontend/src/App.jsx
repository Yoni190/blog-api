import { useState } from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create-blog' element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
