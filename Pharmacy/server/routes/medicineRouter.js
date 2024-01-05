const Router = require('express')
const router = new Router()
const medicineController = require('../controllers/medicineController')

router.post('/', medicineController.create)
router.get('/', medicineController.getAll)
router.get('/:id', medicineController.getOne)

module.exports = router