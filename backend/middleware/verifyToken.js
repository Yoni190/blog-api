const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
            if(err) {
                return res.sendStatus(403)
            }
            req.token = bearerToken
            next()
        })
    } else {
        res.sendStatus(403)
    }
}

module.exports = verifyToken