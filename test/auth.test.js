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

//Create data to use in test
    //Data for login
        //object with correct login data
        const correctLoginData = {
            email: 'test@test.com',
            password: '123'
        }
        //Object with no email for login test
        const noEmailLogin = {
            //email,
            password: '123'
        }
        //Object with incorrect email for login test
        const incorrectEmail = {
            email: 'emailnotindb@nodb.com',
            password: '123'
        }



//Create tests
describe('Testing /auth/ login||register routes', ()=> {

    //First test: GET to /auth/login
    it('GET /auth/login should return status 200', (done) => {
        chai.request(server)
            .get('/auth/login')
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    //Second test: POST to /auth/login successfully
    it('POST /auth/login successfully should return status 200 & object', (done) => {
        chai.request(server)
            .post('/auth/login')
            .send(correctLoginData)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                done()
            })
    })

        //Thrid test: POST to /auth/login with no email
        it('POST to /auth/login with no email should return 400', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(noEmailLogin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.be.a('object');
                    done()
                })
        })
/* 
        //Forth test: POST to /auth/login with no registered email
        it('POST to /auth/login with no registered email', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(incorrectEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.be.a('array');
                    done()
                })
        })
*/






})
