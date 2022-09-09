const express = require("express");
const route = express.Router();

const {postHability,putHability} = require("../controllers/controllerHability");

route.post("/",postHability)
route.put("/",putHability)

module.exports = route;