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
        let  {manufacturerId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let medicines;
        if(!manufacturerId && !typeId){
            medicines = await Medicine.findAndCountAll({limit, offset})
        }
        if(manufacturerId && !typeId){
            medicines = await Medicine.findAndCountAll({where:{manufacturerId}, limit, offset})
        }
        if(!manufacturerId && typeId){
            medicines = await Medicine.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(manufacturerId && typeId){
            medicines = await Medicine.findAndCountAll({where:{typeId, manufacturerId}, limit, offset})
        }
        return res.json(medicines)
    }

    async getOne(req, res){
        const  {id} = req.params
        const medicine = await Medicine.findOne(
            {
                where: {id},
            },
        )
        return res.json(medicine)
    }
}

module.exports = new MedicineController()