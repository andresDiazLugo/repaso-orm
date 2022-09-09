const {Role,Character} = require("../DB/connection")
module.exports = {
    postRole: async(req,res)=>{
        const {name, description, nameCharacter} = req.body
        try {
            const searchCharacter = await Character.findOne({
                where:{
                    name: nameCharacter
                }
            })
            if(searchCharacter){

                const createRole = await Role.create({
                    name,
                    description
                })
                await createRole.addCharacter(searchCharacter)
                console.log(createRole.__proto__)
              return  res.status(200).json({
                    msg: "se agregaron los datos con exito"
                })
            }
            return res.status(404).send("fallaron al querer guardar un registro")
        } catch (error) {
            console.log(error)
            res.status(404).json({
                msg:"salio todo mal"
            })
        }

    }
}