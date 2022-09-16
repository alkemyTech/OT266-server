const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
let should = chai.should();


const { Testimony } = require("../db/models");

const server = require('../app');
const token = process.env.TEST_TOKEN;

const testimonyTest = {
    name : 'test',
    image: 'test',
    content : 'test'
}

