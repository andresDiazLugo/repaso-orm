const {DataTypes} = require('sequelize');


module.exports = sequelize =>{
    sequelize.define('Character',{
       code: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey:true, 
        },
        name:{
            type: DataTypes.STRING,
            unique: true,
                validate:{
                    comprobar(value){
                        if(value === "SoyHenry" || value === "Soy Henry"){
                            throw new Error("el valor no puede ser " + value)
                        }
                    }
                }
        },
        age:{
            type:DataTypes.INTEGER,
            get(){
                const rawValue = this.getDataValue('age')
                return  rawValue + " years old"
               
            }
        },
        race:{
            type: DataTypes.ENUM("Human","Elf","Machine","Animal","Other"),
            defaultValue:"Other"
        },
        hp:{
            type: DataTypes.FLOAT
        },
        mana:{
            type:DataTypes.FLOAT
        },
        data_added:{
            type:DataTypes.DATE,
            defaultValue:new Date()
        }
    },{
    timestamps: false
    })
}