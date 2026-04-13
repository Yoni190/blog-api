const { Router } = require('express')
const blogController = require('../controllers/blogController')
const verifyToken = require('../middleware/verifyToken')
const authorizeRole = require('../middleware/authorizeRole')

const router = Router()

router.get('/', blogController.index)
router.post('/', verifyToken, authorizeRole('AUTHOR'), blogController.create)
router.put('/:id', verifyToken, authorizeRole('AUTHOR'), blogController.edit)
router.delete('/:id', verifyToken, authorizeRole('AUTHOR'), blogController.destroy)
router.patch('/:id', verifyToken, authorizeRole('AUTHOR'), blogController.updatePublishStatus)

module.exports = router