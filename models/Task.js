const { STRING,BIGINT, DATE } = require("sequelize")
const sequelize = require("../DBBroker");

const Task  = sequelize.define('task',
    {
        id:{
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        body:{
            type: STRING,
            allowNull: false,
        },
        user_id:{
          key: true,
          allowNull: false,
          type: STRING
        },
        created:{
            type: DATE,
            allowNull: false,
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
module.exports = Task;