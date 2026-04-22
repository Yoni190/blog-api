import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


const EditBlog = ({ id }) => {
    const token = localStorage.getItem('jwt_token')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const param = useParams()
    const [publishedStatus, setPublishedStatus] = useState(false)
    const [comments, setComments] = useState([])

    const navigate = useNavigate()

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

    
    const getBlog = async () => {
        try {
            const res = await fetch(`http://localhost:3000/blogs/${param.id}`)

            const data = await res.json()
            setTitle(data.blog.title)
            setText(data.blog.text)
            setPublishedStatus(data.blog.isPublished)

            setComments(data.blog.comments)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        getBlog()
    }, [])
    

        const editBlog = async (e) => {
            e.preventDefault()

            try {
                const res = await fetch(`http://localhost:3000/blogs/${param.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        text,
                        isPublished: publishedStatus
                    })
                })

                navigate('/home')
            } catch (error) {
                console.error(error)
            }
            
        }

        const deleteComment = async (id) => {
            try {
                await fetch(`http://localhost:3000/comments/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                getBlog()
            } catch (error) {
                console.error(error)
            }
        }
  return (
    <div>
        <form onSubmit={editBlog}>
            <h1>Edit Blog</h1>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <input type="checkbox" name="publishedStatus" id="publishedStatus" checked={publishedStatus} onChange={(e) => setPublishedStatus(e.target.checked)}/> {publishedStatus ? 'Unpublish' : 'Publish'}
            <button type='submit'>Edit Blog</button>
        </form>

        <h2>Comments</h2>
        {comments.map((comment) => (
            <div key={comment.id}>
                <p>{comment.text}</p>
                <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
            </div>
        ))}
    </div>
  )
}

export default EditBlog