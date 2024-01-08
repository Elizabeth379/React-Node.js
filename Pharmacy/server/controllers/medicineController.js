const uuid = require('uuid')
const  path = require('path');
const {Medicine, MedicineInfo, Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class MedicineController{
    async create(req, res, next){
        try{
            let {name, price, manufacturerId, typeId, info} = req.body
            const{img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const medicine = await Medicine.create({name, price, manufacturerId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    MedicineInfo.create({
                        title: i.title,
                        description: i.description,
                        medicineId: medicine.id
                    })
                )
            }

            return res.json(medicine)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next){
        try {
            const medicines = await Medicine.findAll();
            return res.json(medicines);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Internal Server Error'));
        }

    }

    async getOne(req, res){
        const  {id} = req.params
        const medicine = await Medicine.findOne(
            {
                where: {id},
                include: [{model: MedicineInfo, as: 'info'}]
            },
        )
        return res.json(medicine)
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, manufacturerId, typeId, info } = req.body;

            let updatedMedicine = { name, price, manufacturerId, typeId };

            // Проверяем, пришли ли новые данные по изображению
            if (req.files && req.files.img) {
                const { img } = req.files;
                let fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                updatedMedicine.img = fileName;
            }

            // Обновляем основную информацию по медицине
            await Medicine.update(updatedMedicine, { where: { id } });

            // Проверяем, пришли ли новые данные по info
            if (info) {
                await MedicineInfo.destroy({ where: { medicineId: id } });
                const infoArray = JSON.parse(info);
                infoArray.forEach(i => {
                    MedicineInfo.create({
                        title: i.title,
                        description: i.description,
                        medicineId: id
                    });
                });
            }

            return res.json({ message: 'Лекарство успешно обновлено' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await Medicine.destroy({ where: { id } });
            await MedicineInfo.destroy({ where: { medicineId: id } });

            return res.json({ message: 'Лекарство успешно удалено' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new MedicineController()