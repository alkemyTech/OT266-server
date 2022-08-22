var bcrypt = require('bcryptjs');
require('dotenv').config();

const salt = Number(process.env.HASH_PASSWORD);

const hashPassword = (p) => {
    let passwordHashed = bcrypt.hashSync(p,salt)
    return passwordHashed
}

module.exports = {hashPassword}