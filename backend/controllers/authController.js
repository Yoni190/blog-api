const jwt = require('jsonwebtoken')
const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')
const { use } = require('react')
require('dotenv').config()

const register = async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
        res.json({
            token
        })
    })
}

const login = async (req, res) => {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if(!user) {
        return res.status(401).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(401).json({ message: 'Wrong password' })
    }

    jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
        res.json({ token })
    })
}

const me = (req, res) => {
    return res.json({ message: 'Authenticated' })
}

module.exports = {
    register,
    login,
    me
}