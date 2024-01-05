const  {Manufacturer} =  require('../models/models')
const ApiError = require('../error/ApiError')

class ManufacturerController{
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const manufacturer = await Manufacturer.create({ name });
            return res.json(manufacturer);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getAll(req, res, next) {
        try {
            const manufacturers = await Manufacturer.findAll();
            return res.json(manufacturers);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const manufacturer = await Manufacturer.findByPk(id);

            if (!manufacturer) {
                return next(ApiError.badRequest('Производитель не найден'));
            }

            await manufacturer.update({ name });

            return res.json(manufacturer);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const manufacturer = await Manufacturer.findByPk(id);

            if (!manufacturer) {
                return next(ApiError.badRequest('Производитель не найден'));
            }

            await manufacturer.destroy();

            return res.json({ message: 'Производитель успешно удален' });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

module.exports = new ManufacturerController()