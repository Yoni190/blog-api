const { Router } = require('express')

const router = Router()
const commentController = require('../controllers/commentController')
const verifyToken = require('../middleware/verifyToken')
const authorizeRole = require('../middleware/authorizeRole')

router.get('/', commentController.index)
router.post('/', verifyToken, authorizeRole('USER'), commentController.create)
router.put('/:id', verifyToken, authorizeRole('USER'), commentController.edit)
router.delete('/:id', verifyToken, commentController.destroy)

module.exports = router