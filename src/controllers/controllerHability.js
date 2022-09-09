const {Ability} = require("../DB/connection");
module.exports={
    postHability:async(req,res)=>{
        try {
            const createAbility = await Ability.create(req.body);
            if(!createAbility){
                return res.status(404).json(createAbility);
            }
            return res.status(200).json(createAbility);
        } catch (error) {
            console.log(error)
            res.status(404).send("surgio un error")
        }
    },
    putHability: async(req,res)=>{
        const {idAbility, codeCharacter} = req.body;
        console.log(codeCharacter)
        try {
            const searchAbility = Ability.findByPk(idAbility)
            if(!searchAbility) return res.status(404).send("no se encontro registro de la habilidad solicitada");
            // searchAbility.addCharacter(codeCharacter);
            await Ability.update({CharacterCode:codeCharacter},{
                where :{
                    id:idAbility
                }
            })
            return res.status(200).json(searchAbility)
        } catch (error) {
            console.log(error)
            res.status(404).send("surgio un error")
        }

    }
}