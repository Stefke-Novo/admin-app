const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('admin_db', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});