import React, { useState } from 'react'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password })
            })
            const data = await res.json()
            
            localStorage.setItem('jwt_token', data.token)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <form onSubmit={handleRegister}>
            <input type="text" name="username" id="username" placeholder='username' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}/>
            <input type="email" name="email" id="email" placeholder='email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
            <input type="password" name="password" id="password" placeholder='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register