import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            
            const data = await res.json()
            console.log(data)

        } catch (error) {
            console.error(error)
        }
        
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login