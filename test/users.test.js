//Import Libraries and set assertion style
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
let should = chai.should();

//Import Models
const { User } = require("../db/models/index");

//Import server
const server = require('../app');

//Import token
const token = process.env.TEST_TOKEN;
let userToken1 = null;
let userToken2 = null;
let idUser1 = null;
let idUser2 = null;

//Create data to use in test
//Register a two new users
const newUser1 = {
    firstName: "UserTestingUno",
    lastName: "UserTestingUno",
    email: 'usertesting001@test.com',
    password: '12345T'
}
const newUser2 = {
    firstName: "UserTestingDos",
    lastName: "UserTestingDos",
    email: 'usertesting002@test.com',
    password: '12345T'
}

//Login with the two new users
const loginNewUser1 = {
    email: 'usertesting001@test.com',
    password: '12345T'
}
const loginNewUser2 = {
    email: 'usertesting002@test.com',
    password: '12345T'
}

//update data for the two new users
const updateDataUser1 = {
    firstName: "UserTestingUnoUpdated",
    lastName: "UserTestingUnoUpdated",
    email: 'usertesting001@test.com',
    password: '12345T'
}
const updateDataUser2 = {
    firstName: "UserTestingDosUpdated",
    lastName: "UserTestingDosUpdated",
    email: 'usertesting002@test.com',
    password: '12345T'
}

//Testing for /users routes
describe('Testing /users routes', () => {

    //Setup the database before testing
    before((done) => {
        //Register new user 1
        chai.request(server)
            .post('/auth/register')
            .send(newUser1)
            .end((err, res) => {
            })
        //Register new user 2
        chai.request(server)
            .post('/auth/register')
            .send(newUser2)
            .end((err, res) => {
            })
        //Wait 1 second for the register to finish
        setTimeout(() => {
            //Obtain token for the first new user
            chai.request(server)
                .post('/auth/login')
                .send(loginNewUser1)
                .end((err, res) => {
                    userToken1 = res.body['JWT Token'];
                })

            
            //obtain token for the second new user
            chai.request(server)
            .post('/auth/login')
            .send(loginNewUser2)
            .end((err, res) => {
                userToken2 = res.body['JWT Token'];
            })
            
            //Wait another second for the login to finish
            setTimeout(() => {
                //Obtain id for the first new user
                User.findOne({ where: { email: newUser1.email } })
                    .then(user => {
                        idUser1 = user.id;
                    })

                //Obtain id for the second new user
                User.findOne({ where: { email: newUser2.email } })
                    .then(user => {
                        idUser2 = user.id;
                    })
            }, 1000)
        }, 1000)
        //Wait 5 second before running tests, to ensure that logins ran correctly
        setTimeout(() => {
            done();
        }, 5000);

    })

    //All tests are executed in a single "Describe"
    //to avoid generating too many test users in the Database
    //And the different routes to try are separated by comment lines

    //Here we test the GET /users route
    it('GET /users with a Admin Token should return status 200', (done) => {
        chai.request(server)
            .get('/users')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    it('GET /users with a regular user token should return status 403', (done) => {
        chai.request(server)
            .get('/users')
            .set('Authorization', userToken1)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            })
    })

    it('GET /users with no token should return status 403', (done) => {
        chai.request(server)
            .get('/users')
            .set('Authorization', '')
            .end((err, res) => {
                res.should.have.status(403);
                done()
            })
    })

    it('GET /users with a invalid token should return status 401', (done) => {
        chai.request(server)
            .get('/users')
            .set('Authorization', 'invalidToken')
            .end((err, res) => {
                res.should.have.status(401);
                done()
            })
    })

    //------------------------------------------------------------
    //Here starts the tests for PATCH /users/:id routes
    //------------------------------------------------------------
    it('PATCH /users/:id with a user token should return status 200', (done) => {
        chai.request(server)
            .patch(`/users/${idUser1}`)
            .set('Authorization', userToken1)
            .send(updateDataUser1)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    it('PATCH /users/:id with a another user token should return status 403', (done) => {
        chai.request(server)
            .patch(`/users/` + idUser1)
            .set('Authorization', userToken2)
            .send(updateDataUser1)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            })
    })

    it('PATCH /users/:id with a Admin token should return status 200' , (done) => {
        chai.request(server)
            .patch(`/users/${idUser2}`)
            .set('Authorization', token)
            .send(updateDataUser2)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    it('PATCH /users/:id with a invalid token should return status 401', (done) => {
        chai.request(server)
            .patch(`/users/${idUser1}`)
            .set('Authorization', 'invalidToken')
            .send(updateDataUser1)
            .end((err, res) => {
                res.should.have.status(401);
                done()
            })
    })

    it('PATCH /users/:id with no token should return status 403', (done) => {
        chai.request(server)
            .patch(`/users/${idUser1}`)
            .send(updateDataUser1)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            })
    })

    it('PATCH /users/:id with a invalid id should return status 404', (done) => {
        chai.request(server)
            .patch(`/users/00`)
            .set('Authorization', userToken1)
            .send(updateDataUser1)
            .end((err, res) => {
                res.should.have.status(404);
                done()
            })
    })


    //------------------------------------------------------------
    //Here starts the tests for DELETE /users/:id routes
    //Successful removal cases were placed at the end of the test
    //for reuse of users and their tokens along with cases where they would not be removed.
    //------------------------------------------------------------
    it('DELETE /users/:id with a another user token should return status 403', (done) => {
        chai.request(server)
            .delete(`/users/delete/${idUser2}`)
            .set('Authorization', userToken1)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            })
    })

    it('DELETE /users/:id with a invalid token should return status 401', (done) => {
        chai.request(server)
            .delete(`/users/delete/${idUser1}`)
            .set('Authorization', 'invalidToken')
            .end((err, res) => {
                res.should.have.status(401);
                done()
            })
    })

    it('DELETE /users/:id with no token should return status 403', (done) => {
        chai.request(server)
            .delete(`/users/delete/${idUser1}`)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            })
    })

    
    it('DELETE /users/:id with a invalid id should return status 404', (done) => {
        chai.request(server)
            .delete(`/users/delete/invalidId`)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(404);
                done()
            })

    it('DELETE /users/:id with a user token should return status 200', (done) => {
        chai.request(server)
            .delete(`/users/delete/${idUser1}`)
            .set('Authorization', userToken1)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
        })
    })

    it('DELETE /users/:id with a Admin token should return status 200' , (done) => {
        chai.request(server)
            .delete(`/users/delete/${idUser2}`)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    //End of tests
    //Removing the users created for the tests
    after((done) => {
        User.destroy({
            where: {
                id: [idUser1, idUser2]
            },
            force: true
        })
            .then(() => {
                done()
            })
    })

})
