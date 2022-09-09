const {DataTypes} = require("sequelize");

module.exports= sequelize=>{
    sequelize.define("Role",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey:true, 
       },
        name:{
            type: DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING
        }
    },{
        timestamps: false 
    })
}