const express = require("express");
const app = express();
const morgan = require('morgan')
const {db} = require('./DB/connection')

const routeCharacter = require('./routes/character')
const routeRole = require('./routes/role')
const routeHabilty = require('./routes/hability')

// const cors = require('cors');
const PORT = 3001;
//agregar cors despues no olvidarse


//middlewares
app.use(express.json());//poder recibir objetos en las peticiones
app.use(morgan('dev'))//ver las peticiones en consola


//rutas
app.use("/api/character",routeCharacter)//modularizar rutas
app.use("/api/role",routeRole)//modularizar rutas
app.use("/api/hability",routeHabilty)//modularizar rutas



//runing server
app.listen(PORT,()=>{
    console.log("runing in the Port "+ PORT)

    db.sync({force: true}).
    then(rpta=>console.log("successful connection")).
    catch(error => console.log(" an error occurred while synchronizing "+ error))
})