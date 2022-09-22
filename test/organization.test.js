//Import Libraries and set assertion style
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
let should = chai.should();


//Import Models
const { Organization } = require("../db/models/index");

//Import server
const server = require('../app');

//Import token
const token = process.env.TEST_TOKEN;

//Start testing
describe('Testing GET to /organization/public route', () => {
    it("It should return a 200 status when it doesn't receive a token and also return an array of objects", (done) => {
        chai.request(server)
            .get('/organization/public')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
    })
    it("It should return a 200 status when it receives a token and also return an array of objects", (done) => {
        chai.request(server)
            .get('/organization/public')
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
    })
})

describe('Testing GET to /organization route', () => {
    it("It should return a 403 status when it doesn't receive a token", (done) => {
        chai.request(server)
            .get('/organization')
            .end((err, response) => {
                response.should.have.status(403);
                done();
            })
    })
    it("It should return a 200 status when it receives a administrator token and also return an array of objects", (done) => {
        chai.request(server)
            .get('/organization')
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    })
})

//Create data to use in the next test
const newOrganization = {
    name: "OrganizationTestingName",
    address: "OrganizationTestingAddress",
    image: "",
    phone: "1234567890",
    email: "organizationtesting@test.com",
    welcomeText: "OrganizationTestingWelcomeText",
    aboutUsText: "OrganizationTestingAboutUsText",
    urlFacebook: "OrganizationTestingUrlFacebook",
    urlInstagram: "OrganizationTestingUrlInstagram",
    urlLinkedin: "OrganizationTestingUrlLinkedin",
}

describe('Testing POST to /organization/new route', () => {
    it("It should return a 403 status when it doesn't receive a token", (done) => {
        chai.request(server)
            .post('/organization/new')
            .send(newOrganization)
            .end((err, response) => {
                response.should.have.status(403);
                done();
            })
    })

    it("It should return a 201 status when it receives a administrator token", (done) => {
        chai.request(server)
            .post('/organization/new')
            .set('Authorization', token)
            .send(newOrganization)
            .end((err, response) => {
                response.should.have.status(201);
                done();
            })
    })
})

//Create data to use in the next test
const updateOrganization = {
    name: "OrganizationTestingNameUpdated",
    address: "OrganizationTestingAddressUpdated",
    image: "",
    phone: "12345678900",
    email: "organizationupdated@test.com",
    welcomeText: "OrganizationTestingWelcomeTextUpdated",
    aboutUsText: "OrganizationTestingAboutUsTextUpdated",
    urlFacebook: "OrganizationTestingUrlFacebookUpdated",
    urlInstagram: "OrganizationTestingUrlInstagramUpdated",
    urlLinkedin: "OrganizationTestingUrlLinkedinUpdated",
}

//Initialize a variable to use in the next tests
let idOrganization;

describe('Testing PUT to /organization/update/:id route', () => {
    before(async () => {
        const organization = await Organization.findOne({
            where: {
                name: "OrganizationTestingName"
            }
        })
        idOrganization = organization.id;
    })

    it("It should return a 403 status when it doesn't receive a token", (done) => {
        chai.request(server)
            .put('/organization/update/1')
            .send(updateOrganization)
            .end((err, response) => {
                response.should.have.status(403);
                done();
            })
    })

    it("It should return a 200 status when it receives a administrator token", (done) => {
        chai.request(server)
            .put('/organization/update/1')
            .set('Authorization', token)
            .send(updateOrganization)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    })
})



describe('Testing DELETE to /organization/delete/:id route', () => {
    it("It should return a 403 status when it doesn't receive a token", (done) => {
        chai.request(server)
            .delete(`/organization/delete/${idOrganization}`)
            .end((err, response) => {
                response.should.have.status(403);
                done();
            })
    })

    it("It should return a 200 status when it receives a administrator token", (done) => {
        chai.request(server)
            .delete(`/organization/delete/${idOrganization}`)
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    })
})

//After all tests, delete the data created
after(async () => {
    await Organization.destroy({
        where: {
            name: "OrganizationTestingNameUpdated"
        },
        force: true
    })
})