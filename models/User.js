const { DataTypes } = require("sequelize")
const sequelize = require("./../DBBroker")
const Task = require("./Task")

const User = sequelize.define('user',
    {
        firstName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            primaryKey: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        role:{
            type: DataTypes.ENUM,
            allowNull:false,
            values: ["basic", "admin"]
        }
    },
    {
        // // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    }
)

User.hasMany(Task,{
    foreignKey: {
        name: "user_id",
        allowNull: false
    },
})
Task.belongsTo(User,{
    foreignKey: {
        name: "user_id",
        allowNull: false
    },
})

module.exports = User;