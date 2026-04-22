import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


const EditBlog = ({ id }) => {
    const token = localStorage.getItem('jwt_token')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const param = useParams()

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

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await fetch(`http://localhost:3000/blogs/${param.id}`)

                const data = await res.json()
                setTitle(data.blog.title)
                setText(data.blog.text)
            } catch (error) {
                console.error(error)
            }
        }

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
                        text
                    })
                })

                navigate('/home')
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
            <button type='submit'>Edit Blog</button>
        </form>
    </div>
  )
}

export default EditBlog