const { Router } = require('express')
const blogController = require('../controllers/blogController')
const verifyToken = require('../middleware/verifyToken')

const router = Router()

router.get('/', blogController.index)


module.exports = router