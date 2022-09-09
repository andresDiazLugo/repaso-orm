const {Sequelize} = require("sequelize")
require('dotenv').config()
const character = require("./models/Character");
const hability = require("./models/Ability");
const role = require("./models/Role");
const db = new Sequelize(`postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.PORT}/${process.env.DB_USER}`,{
    logging:false
})
character(db);
hability(db);
role(db);

const {Character, Ability, Role} = db.models
//un personaje tiene muchas habilidades
//una habilidad pertenece a un personaje
Character.hasMany(Ability)
Ability.belongsTo(Character)

//un personaje pertenece a muchos role
//un rol pertenece a muchos personaje
Character.belongsToMany(Role,{through : 'charXRol'})
Role.belongsToMany(Character,{through : 'charXRol'})





module.exports = {
    db,
    ...db.models
}