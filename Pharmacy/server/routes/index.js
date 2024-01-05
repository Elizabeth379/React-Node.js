const Router = require('express')
const router = new Router()
const  manufacturerRouter = require('./manufacturerRouter')
const  medicineRouter = require('./medicineRouter')
const  typeRouter = require('./typeRouter')
const  userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/manufacturer', manufacturerRouter)
router.use('/medicine', medicineRouter)

module.exports = router