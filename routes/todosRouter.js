const Router = require('express')
const router = new Router()
const todosController = require('../controllers/todosController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, todosController.getAll)
router.post('/', authMiddleware, todosController.create)
router.post('/:id', authMiddleware, todosController.changeOptions)
router.delete('/:id', authMiddleware, todosController.destroy)

module.exports = router