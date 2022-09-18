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
            //email: "test@test.com",
            email: 'emailnotindb@nodb.com',
            password: '123'
        }
        //Object with no password for login test
        const noPasswordLogin = {
            email: "test@test.com",
            //password: '123'
        }
        //Object with invalid for login test
        const invalidPasswordLogin = {
            email: "test@test.com",
            password: 'notrealpassword'
        }


//Create tests
describe('Testing /auth/login routes', ()=> {

    //First login test: GET to /auth/login
    it('GET /auth/login should return status 200', (done) => {
        chai.request(server)
            .get('/auth/login')
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    //Cases for trying to login
        //0) Correct login - done
        //1) No email sent - done
        //2) Invalid email - done
        //3) no password sent - done
        //4) Invalid password for the user

    //Second login test: POST to /auth/login successfully
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

        //Thrid login test: POST to /auth/login with no email
        it('POST to /auth/login with no email should return 401 status  & an object', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(noEmailLogin)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a('object');
                    done()
                })
        })

        //Fourth login test: POST to /auth/login with no registered email
        it('POST to /auth/login with no registered email should return 401 status & an object', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(incorrectEmail)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a('object');
                    done()
                })
        })

        //Fifth login test: POST to /auth/login with no password sent
        it('POST to /auth/login with no password should return 401 status & an object', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(noPasswordLogin)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a('object');
                    done()
                })
        })

        //Sixth login test: POST to /auth/login with incorrect password
        it('POST to /auth/login with incorrect password should return 401 status & an object', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(invalidPasswordLogin)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a('object');
                    done()
                })
        })
})


