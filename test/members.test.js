const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');
const Member = require('../db/models')
require('dotenv').config()

chai.use(chaiHttp);

describe("testing the members' endpoints", () => {

    let member = {
        nameMember: "test member",
        facebookUrl: "https:/facebook.com/test_member",
        instagramUrl: "https:/instagram.com/test_member",
        linkedinUrl: "https:/linkedin.com/in/test_member",
        image: "test_member.jpg",
        description: "test"
    }

    it('should verify that there 10 members in the page 1', (done) => {
        let page = 1;
        chai.request(app)
            .get('/members?' + page)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });


    it('should show some attributes of the members', (done) => {
        let token = process.env.TEST_TOKEN;
        chai.request(app)
            .get('/members/attributes')
            .set({
                Authorization: token
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });


    it('should POST a valid member', (done) => {
        chai.request(app)
            .post('/members')
            .send(member)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('msg').eql('Member created successfully');
                done();
            });
    });

    it('it should UPDATE a member given the id', (done) => {
        chai.request(app)
            .put('/members/update/' + 9)
            .send({
                nameMember: "test member",
                facebookUrl: "https:/facebook.com/test_member",
                instagramUrl: "https:/instagram.com/test_member",
                linkedinUrl: "https:/linkedin.com/in/test_member",
                image: "test_member.jpg",
                description: "test"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.member.should.have.property('nameMember').eql("test member");
                done();
            });
    });

    it('it should DELETE a member given the id', (done) => {
        chai.request(app)
            .delete('/members/delete/' + 59)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
})