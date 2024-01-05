const Router = require('express')
const router = new Router()
const medicineController = require('../controllers/medicineController')

router.post('/', medicineController.create);
router.get('/', medicineController.getAll);
router.get('/:id', medicineController.getOne);
router.put('/:id', medicineController.update);
router.delete('/:id', medicineController.delete);

module.exports = router