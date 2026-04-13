const { Router } = require('express')
const blogController = require('../controllers/blogController')
const verifyToken = require('../middleware/verifyToken')
const authorizeRole = require('../middleware/authorizeRole')

const router = Router()

router.get('/', blogController.index)
router.post('/', verifyToken, authorizeRole('AUTHOR'), blogController.create)
router.put('/:id', verifyToken, authorizeRole('AUTHOR'), blogController.edit)

module.exports = router