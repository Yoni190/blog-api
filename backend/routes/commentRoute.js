const { Router } = require('express')

const router = Router()
const commentController = require('../controllers/commentController')
const verifyToken = require('../middleware/verifyToken')
const authorizeRole = require('../middleware/authorizeRole')

router.get('/', commentController.index)

module.exports = router