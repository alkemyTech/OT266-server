require('dotenv').config()

module.exports = {
    "development": {
        "username": 'ong_user',
        "password": 'ong_5439!',
        "database": 'ong',
        "host": '45.236.130.67',
        "port": '3306',
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    }
}