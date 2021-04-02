const Sequelize = require("sequelize");
const connection =  require("./database");

const Answer = connection.define('answers',{
    response: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    id_question: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {});

Answer.sync({force: false});

module.exports = Answer;
