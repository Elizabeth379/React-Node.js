const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role:  {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketMedicine = sequelize.define('basket_medicine', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Medicine = sequelize.define('medicine', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Manufacturer = sequelize.define('manufacturer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const MedicineInfo = sequelize.define('medicine_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const  TypeManufacturer = sequelize.define('type_manufacturer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketMedicine)
BasketMedicine.belongsTo(Basket)

Type.hasMany(Medicine)
Medicine.belongsTo(Type)

Manufacturer.hasMany(Medicine)
Medicine.belongsTo(Manufacturer)

Medicine.hasMany(BasketMedicine)
BasketMedicine.belongsTo(Medicine)

Medicine.hasMany(MedicineInfo, {as: 'info'});
MedicineInfo.belongsTo(Medicine)

Type.belongsToMany(Manufacturer, {through: TypeManufacturer})
Manufacturer.belongsToMany(Type, {through: TypeManufacturer})

module.exports = {
    User,
    Basket,
    BasketMedicine,
    Medicine,
    Type,
    Manufacturer,
    TypeManufacturer,
    MedicineInfo
}