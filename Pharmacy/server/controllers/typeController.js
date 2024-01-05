const  {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController{
    async create(req, res, next){
        try {
            const { name } = req.body;
            const type = await Type.create({ name });
            return res.json(type);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getAll(req, res, next){
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req, res, next){
        try {
            const { id } = req.params;
            const { name } = req.body;

            const type = await Type.findByPk(id);

            if (!type) {
                return next(ApiError.badRequest('Такой тип не найден'));
            }

            await type.update({ name });

            return res.json(type);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res, next){
        try {
            const { id } = req.params;

            const type = await Type.findByPk(id);

            if (!type) {
                return next(ApiError.badRequest('Тип не найден'));
            }

            await type.destroy();

            return res.json({ message: 'Тип успешно удален' });
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

module.exports = new TypeController()