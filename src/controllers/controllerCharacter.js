const {Character, Ability,Role} = require("../DB/connection")
const {Op} = require("sequelize")

module.exports ={
    
   postCharacter: async(req,res)=>{
        try {
            
            const dataRecived  = req.body 
            const createCharacter = await Character.create(dataRecived)
            if(!createCharacter)return res.status(404).json({
                msg:"Error en alguno de los datos provistos"
            })
            console.log(createCharacter.__proto__)
            return res.status(201).json(createCharacter)
        } catch (error) {
            return res.status(404).json({
                msg:"hubo un error al cargar los datos"
            })
        }
      },

    getCharacter: async(req,res)=>{
        try {
            const {age} = req.query
            const array = []
            for(let prop in req.query){
                array.push(prop)
            }
            let getAllCharacters= await Character.findAll()
            if(array.length === 0) return res.status(200).json(getAllCharacters)
            if(!getAllCharacters) return res.status(201).json({
                msg: "se hubo un error al buscar registros"
            })
            if( array.length > 0 && age !== "true") {
                getAllCharacters = await Character.findAll({
                    attributes:array,
                    where:{
                        age
                    }
                 })
                return res.status(200).json(getAllCharacters)
            }
             getAllCharacters = await Character.findAll({
                attributes:array,
             })
             return res.status(200).json(getAllCharacters)
        } catch (error) {
            console.log(error
                )
            return res.status(404).send("no se encontraron registros")
        }
    },
    getCharacterYoung: async (req,res)=>{
     
        try {
            const  getAllCharactersYoung = await Character.findAll({
                where:{
                    age:{
                        [Op.lt]: 25
                    }
                }
            })
            res.json(getAllCharactersYoung)
        } catch (error) {
            res.status(404).json({msg:"hubo un error"})
        }
    },
    getCharacterYoungUpdate: async(req,res)=>{
        try {
            
            const {value} = req.query
            const arrValue = Object.values(req.params)[0].split("=")
            
            if(value && arrValue[0]){
                const updateCharacter = await  Character.update({//esto me devuelve un array con numeros si se completo la accion o un arreglo vacio si ni se completo la axxion
                    [arrValue[0]]: Number(value) 
                },{
                    where:{
                        [arrValue[0]] : Number(arrValue[1])
                    }
                })
               
                if(updateCharacter){
                    console.log(updateCharacter)
                    return res.status(200).json({msg:"personajes actualizados"})
                }else{
                    return res.status(404).json({msg:"los datos no se pudieron actualizar"})
                }
            }
        } catch (error) {
            return res.status(404).json({
                msg:"surgio un error al actualizar los registros solicitados"
            })
        }
    },
    putAddAbility:async(req,res)=>{
        try {
            const {id,abilities} = req.body
            const searchCharacterById = await Character.findByPk(id)
            const createAbility = await Ability.bulkCreate(abilities)
            for(let i = 0; i< abilities.length; i++){
                let searchAbility = await Ability.findOne({
                    where:{
                        name:abilities[i].name
                    }
                })
                await searchCharacterById.addAbility(searchAbility)
            }
            return res.status(200).send("todo salio bien")
        } catch (error) {
            console.log(error)
            res.status(404).send("surgio un error al cargar los datos")
        }
    },
    getCharacterRoles:async(req,res)=>{
        const {code} = req.params;
        console.log(code)
        try {
            const searchAll = await Character.findOne({
                where:{
                   code: String(code)
                },
                include: {
                    model:Role,
                    attributes:["name","description"],
                    through:{
                        attributes:[]
                    }
                },
            })

            res.status(200).json(searchAll)
            
        } catch (error) {
            console.log(error)
            res.status(404).send("surgio un error")
        }
    }
    
} 