const chai = require ('chai');
const chaiHttp = require('chai-http');
const server = require('../app');;

//Import model
const {User} = require('../db/models/index')

//Set assertion style
chai.use(chaiHttp);
chai.should();

//Token created & saved for testing
const token = process.env.TEST_TOKEN;

