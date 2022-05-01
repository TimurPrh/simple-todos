const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const todosRouter = require('./todosRouter')

router.use('/user', userRouter)
router.use('/todos', todosRouter)

module.exports = router