import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState({})
  const token = localStorage.getItem('jwt_token')
  const [loggedIn, setLoggedIn] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${id}`)
      .then((res) => res.json())
      .then((res) => setBlog(res.blog))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
  
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

      const submitComment = async (e) => {
        e.preventDefault()

        try {
          const blogId = await blog.id
          console.log(blogId)
          const res = await fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: comment,
              blogId
            })
          })

          console.log(res)
        } catch (error) {
          console.error(error)
        }
      }
  
  return (
    <div>
      <h1>{blog.title}</h1>
      <h2>{blog.author?.username}</h2>
      <p>{blog.text}</p>

      {loggedIn && (
        <div>
          <form onSubmit={submitComment}>
            <h2>Add a Comment</h2>
            <textarea name="text" id="text" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <button type='submit'>Post Comment</button>
          </form>
        </div>
      )}
      
    </div>
  )
}

export default BlogDetails