const {DataTypes} = require("sequelize");
module.exports= sequelize=>{
    sequelize.define("Ability",{
        id:{
             type: DataTypes.UUID,
             defaultValue: DataTypes.UUIDV4,
             allowNull: false,
             primaryKey:true, 
        },
        name:{
            type:DataTypes.STRING,
            unique: true,
        },
        description:{
            type:DataTypes.TEXT,
        },
        mana_cost:{
            type:DataTypes.FLOAT,
            unique:true,
                validate:{
                    isRang(value){
                        if(value > 250.0 || value < 10.0){
                            throw new Error ('el valor de mana-cost tiene que ser etre 10.0 a 250.0')
                        }
                    }
                }
        },
        summary:{
            type: DataTypes.VIRTUAL,
            get(){
                return `name: ${this.name} description: ${this.description} mana:${this.mana_cost}`
            }
        }
    },{
        timestamps: false
    })
}