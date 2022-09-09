const express = require("express")
const route = express.Router()
const {postCharacter,getCharacter,getCharacterYoung,getCharacterYoungUpdate,putAddAbility,getCharacterRoles}= require('../controllers/controllerCharacter.js')


route.post("/", postCharacter)
route.get("/",getCharacter)
route.get("/young",getCharacterYoung)
route.put("/young/:attribute",getCharacterYoungUpdate)
route.put("/addAbilities",putAddAbility)
route.get("/roles/:code",getCharacterRoles)



module.exports = route;