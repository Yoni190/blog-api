import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Home = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
      fetch('http://localhost:3000/blogs')
        .then((res) => res.json())
        .then((res) => setBlogs(res.blogs))
        .catch((err) => console.error(err))

        console.log(blogs)
    }, [])

    
    
  return (
    <div>
        <header>
            <h1>Blogs</h1>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
        </header>
        
        <ul>
            {blogs.map((blog) => (
                <li key={blog.id}>
                  <Link to={`/${blog.id}`}><h2>{blog.title}</h2></Link>
                  <p>{blog.author.username} {blog.createdAt}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Home