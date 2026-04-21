import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            console.log(username)
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    isAuthor: true
                })
            })

            const data = await res.json()
            localStorage.setItem('jwt_token', data.token)
        } catch (error) {
            console.error(error)
        }
        
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type="username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default Login