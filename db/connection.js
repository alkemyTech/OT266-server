const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = {}

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

db.connection = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
});

//Vinculo modelos
                                    // son los valores que hay que importar al modelo
db.User = require("./models/user")(db.connection, DataTypes);


module.exports = db;