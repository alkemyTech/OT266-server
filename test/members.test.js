const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');
const Member = require('../db/models')

chai.use(chaiHttp);

describe("testing the members' endpoints", () => {

    it('should verify that there are 10 members in the page', (done) => {
        chai.request(app)
        .get('/members')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.length.should.be.eql(10);       
            done();
        });
    });


    it('should show some attributes of the members', (done) => {
        chai.request(app)
        .get('/members/attributes')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });


    it('should POST a valid member', (done) => {
        let member = {
            nameMember: "test member",
            facebookUrl: "https:/facebook.com/test_member",
            instagramUrl: "https:/instagram.com/test_member",
            linkedinUrl: "https:/linkedin.com/in/test_member",
            image: "test_member.jpg",
            description: "test"
        }
        chai.request(app)
        .post('/members')
        .send(member)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('msg').eql('Member created successfully');
            done();
        });
    });

    it('it should UPDATE a member given the id', async (done) => {
        let member = new Member({
            nameMember: "test member",
            facebookUrl: "https:/facebook.com/test_member",
            instagramUrl: "https:/instagram.com/test_member",
            linkedinUrl: "https:/linkedin.com/in/test_member",
            image: "test_member.jpg",
            description: "test"
        });
        member.save((err, member) => {
                chai.request(server)
                .put('/members/update/' + member.id)
                .send({
                    nameMember: "member updated",
                    facebookUrl: "https:/facebook.com/test_member",
                    instagramUrl: "https:/instagram.com/test_member",
                    linkedinUrl: "https:/linkedin.com/in/test_member",
                    image: "test_member.jpg",
                    description: "test"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.member.should.have.property('nameMember').eql("member updated");
                done();
            });
        });
    });

    it('it should DELETE a member given the id', async (done) => {
        let member = new Member({
            nameMember: "test member",
            facebookUrl: "https:/facebook.com/test_member",
            instagramUrl: "https:/instagram.com/test_member",
            linkedinUrl: "https:/linkedin.com/in/test_member",
            image: "test_member.jpg",
            description: "test"
        });
        member.save((err, member) => {
                chai.request(server)
                .delete('/members/delete/' + member.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });
})