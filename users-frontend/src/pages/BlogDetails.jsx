import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState({})
  const token = localStorage.getItem('jwt_token')
  const [loggedIn, setLoggedIn] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

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


      useEffect(() => {
        if (!blog.id) return

        const getComments = async () => {
          try {
            const res = await fetch(`http://localhost:3000/comments?blogId=${blog.id}`)
            const commentsObject = await res.json()

            setComments(commentsObject.comments)
            console.log(commentsObject)
            
          } catch (error) {
            console.error(error)
          }
        }

        getComments()
      }, [blog.id])
      

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


      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p>{comment.createdAt}</p>
          <h3>{comment.user.username}</h3>
        </div>
      ))}
      
    </div>
  )
}

export default BlogDetails