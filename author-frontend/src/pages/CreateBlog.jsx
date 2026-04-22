import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const token = localStorage.getItem('jwt_token')

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

    const createBlog = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3000/blogs', {
                method: 'POST',
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
        <form onSubmit={createBlog}>
            <h1>Create a blog</h1>
            <input type="text" name="title" id="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea name="text" id="text" placeholder='Blog text' value={text} onChange={(e) => setText(e.target.value)}></textarea>

            <button type='submit'>Create blog</button>
        </form>
    </div>
  )
}

export default CreateBlog