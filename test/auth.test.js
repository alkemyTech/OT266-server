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

//Testing for /auth/register

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
        it('POST to /auth/login with no email sent should return 401 status  & an object', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(noEmailLogin)
                .end((err, res) => {
                    res.should.have.status(400);
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
                    res.should.have.status(400);
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


//Testing for /auth/register

//Create data to use in register test
    //Data for register
        //object with existing email data
        const existingEmailRegister = {
            firstName: "Juan",
            lastName: "Riquelme",
            email: 'test@test.com',
            password: '10'
        }
        //object with no firstName data
        const noFirstNameRegister = {
            //firstName: "Juan",
            lastName: "Riquelme",
            email: 'test@test.com',
            password: '10'
        }
        //object with no lastName data
        const noLastNameRegister = {
            firstName: "Juan",
            //lastName: "Riquelme",
            email: 'test@test.com',
            password: '10'
        }
        //object with no email data
        const noEmailRegister = {
            firstName: "Juan",
            lastName: "Riquelme",
            //email: 'test@test.com',
            password: '10'
        }
        //object with no password data
        const noPasswordRegister = {
            firstName: "Juan",
            lastName: "Riquelme",
            email: 'test@test.com',
            //password: '10'
        }

        //To create a random email for the insert test
            const characters ='abcdefghijklmnopqrstuvwxyz';
            function generateString(length) {
                let result = '';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                return result;
            }
            //Get the random email
            let newEmail = generateString(10);

        //Create data with random email
            let validEmailRegister = {
                firstName: "Juan",
                lastName: "Riquelme",
                password: '123',
                email: `${newEmail}@test.com`
            }

describe('Testing /auth/register routes', ()=> {

    //GET register test: GET to /auth/register
    it('GET /auth/register should return status 200', (done) => {
        chai.request(server)
            .get('/auth/register')
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

        //Cases for trying to register ()
        //1) Email already exists -  done
        //2) No firstName sent - done 
        //3) No lastName sent - done
        //4) No emai sent - done
        //5) No password sent - done
        //6) successfully Register - done

    //First register test: POST to /auth/register with existing email
    it('POST to /auth/register with existing email should return status 409 & object', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(existingEmailRegister)
            .end((err, res) => {
                res.should.have.status(409);
                res.should.be.a('object');
                done()
            })
    })

    //Second register test: POST to /auth/register with no firstName sent
    it('POST to /auth/register with no firstName sent should return status 400 & object', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(noFirstNameRegister)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a('object');
                done()
            })
    })

    //Third register test: POST to /auth/register with no lastName sent
    it('POST to /auth/register with no lastName sent should return status 400 & object', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(noLastNameRegister)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a('object');
                done()
            })
    })

    //Fourth register test: POST to /auth/register with no email sent
    it('POST to /auth/register with no email sent should return status 400 & object', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(noEmailRegister)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a('object');
                done()
            })
    })

    //Fifth register test: POST to /auth/register with no password sent
    it('POST to /auth/register with no password sent should return status 400 & object', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(noPasswordRegister)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a('object');
                done()
            })
    })

    //Sixth register test: POST to /auth/register with successfully register
    it('POST to /auth/register with successfully register should return status 201 & object', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send(validEmailRegister)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a('object');
                done()
            })
    })
})