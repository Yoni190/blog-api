const jwt = require('jsonwebtoken')
const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')
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

module.exports = {
    register
}