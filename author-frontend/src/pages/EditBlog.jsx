import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'


const EditBlog = ({ id }) => {
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
  return (
    <div>EditBlog</div>
  )
}

export default EditBlog