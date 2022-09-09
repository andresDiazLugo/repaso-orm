const express = require("express")
const route = express.Router()
const {postRole} = require("../controllers/controllerRole")
route.post("/",postRole)

module.exports = route