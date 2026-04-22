import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    const token = localStorage.getItem('jwt_token')

    useEffect(() => {
      fetch('http://localhost:3000/blogs')
        .then((res) => res.json())
        .then((res) => setBlogs(res.blogs))
        .catch((err) => console.error(err))

    }, [])

    console.log(blogs)

    useEffect(() => {
      if(!token) return

      const authenticateUser = async () => {
        try {
          const res = await fetch('http://localhost:3000/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          setLoggedIn(res.ok)
        } catch (error) {
          console.error(error)
        }
      }

      authenticateUser()
      
    }, [token])
    
    const removeToken = () => {
      localStorage.removeItem('jwt_token')
      setLoggedIn(false)
    }
    
    
  return (
    <div>
        <header>
            <h1>Blogs</h1>
            {!loggedIn ? (
              <>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
              </>
            ) : (
                <>
                  <button onClick={removeToken}>Log Out</button>
                </>
            )}
            
        </header>
        
        <ul>
            {blogs.map((blog) => {
              return blog.isPublished && (
                <li key={blog.id}>
                    <Link to={`/${blog.id}`}><h2>{blog.title}</h2></Link>
                    <p>{blog.author.username} {blog.createdAt}</p>
                  </li>
              )
              })}
        </ul>
    </div>
  )
}

export default Home