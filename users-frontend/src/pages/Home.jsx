import React, { useEffect, useState } from 'react'

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
        </header>
        
        <ul>
            {blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </ul>
    </div>
  )
}

export default Home