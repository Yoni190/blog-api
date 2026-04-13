const { Router } = require('express')
const blogController = require('../controllers/blogController')
const verifyToken = require('../middleware/verifyToken')

const router = Router()

router.get('/', blogController.index)
router.post('/', verifyToken, blogController.create)
router.put('/:id', verifyToken, blogController.edit)

module.exports = router