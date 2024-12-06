const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('admin_db','admin','admin',{
    port:"5433",
    dialect: "postgres"
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }