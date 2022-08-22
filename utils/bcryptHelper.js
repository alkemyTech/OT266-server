var bcrypt = require('bcryptjs');
require('dotenv').config();

const salt = Number(process.env.HASH_PASSWORD);

const hashPassword = (p) => {
    let passwordHashed = bcrypt.hashSync(p,salt)
    return passwordHashed
}

const comparePassword = (p,hash) => {
    return bcrypt.compareSync(p,hash)
}

module.exports = {hashPassword,comparePassword}