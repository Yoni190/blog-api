import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'



const Home = () => {
    const token = localStorage.getItem('jwt_token')
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        if(!token) {
            navigate('/')
            return
        }

        const authenticate = async () => {
            try {
                const res = await fetch('http://localhost:3000/me', {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                })

                if(!res.ok) {
                    navigate('/')
                }
            } catch (error) {
                console.error(error)
            }
        }

        authenticate()
      
    }, [token])

    useEffect(() => {
        if(!token) return

        const getBlogs = async () => {
            try {
                const res = await fetch('http://localhost:3000/blogs/author', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const data = await res.json()
                setBlogs(data.blogs)
            } catch (error) {
                console.error(error)
            }
        }

        getBlogs()
    }, [token])

    const removeToken = () => {
        localStorage.removeItem('jwt_token')
        navigate('/')
    }
    
    
  return (
    <div>
        <h1>Home</h1>
        <Link to={'/create-blog'}>Create a Blog</Link>
        <button onClick={removeToken}>Log Out</button>

        {blogs.map((blog) => (
            <div key={blog.id}>
                <Link to={`/edit-blog/${blog.id}`}><h3>{blog.text}</h3></Link>
                <p>{blog.isPublished ? 'Published' : 'Not Published'}</p>
                <p>{blog.createdAt}</p>
            </div>
        ))}
    </div>
  )
}

export default Home