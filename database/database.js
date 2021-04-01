const Sequelize = require("sequelize");

const connection = new Sequelize('youhoo', 'root', 'adm123123',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;