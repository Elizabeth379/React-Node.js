const uuid = require('uuid')
const  path = require('path');
const {Medicine} = require('../models/models')
const ApiError = require('../error/ApiError')

class MedicineController{
    async create(req, res, next){
        try{
            const {name, price, manufacturerId, typeId} = req.body
            const{img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const medicine = await Medicine.create({name, price, manufacturerId, typeId, img: fileName})

            return res.json(medicine)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const  {manufacturerId, typeId} = req.query
        let medicines;
        if(!manufacturerId && !typeId){
            medicines = await Medicine.findAll()
        }
        if(manufacturerId && !typeId){
            medicines = await Medicine.findAll({where:{manufacturerId}})
        }
        if(!manufacturerId && typeId){
            medicines = await Medicine.findAll({where:{typeId}})
        }
        if(manufacturerId && typeId){
            medicines = await Medicine.findAll({where:{typeId, manufacturerId}})
        }
        return res.json(medicines)
    }

    async getOne(req, res){

    }
}

module.exports = new MedicineController()