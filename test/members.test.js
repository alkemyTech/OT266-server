const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');

const app = require('../app');
const { Member } = require('../db/models')
require('dotenv').config()

chai.use(chaiHttp);

let member = {
    nameMember: "test member",
    facebookUrl: "https:/facebook.com/test_member",
    instagramUrl: "https:/instagram.com/test_member",
    linkedinUrl: "https:/linkedin.com/in/test_member",
    image: "test_member.jpg",
    description: "test"
}

let memberToUpdate = {
    nameMember: "test",
    facebookUrl: "https:/facebook.com/test_member",
    instagramUrl: "https:/instagram.com/test_member",
    linkedinUrl: "https:/linkedin.com/in/test_member",
    image: "test_member.jpg",
    description: "test"
}

/**
 * * this thest assures 10 members per page
 * * it is mandatory that a page be sent
 */
describe("GET /members", ()=>{
    it('should verify that there 10 members in the page 1', (done) => {
        let page=1;
        chai.request(app)
        .get('/members?' + page)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');      
            done();
        });
    });
});

/**
 * * this thest assures 10 members per page
 * * it is mandatory to be authenticated as an administrator
 */
describe("GET /members/attributes", ()=>{
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
});

/**
 * * this thest assures 10 members per page
 * * it is mandatory to sent the information as a body
 */
 describe("POST /members", ()=>{
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
    after(async() => {
        let memberToDelete = await Member.findOne({
            where: { nameMember:'test member' }
        });
        await memberToDelete.destroy();
    });
});

/**
 * * this thest assures 10 members per page
 * @param id is mandatory
 */
 describe("PUT /members/update/:id", ()=>{

    let memberId;

    before(async () => {
        const newMember = new Member(member);
        await newMember.save();
        memberId = newMember.dataValues.id;
    });

    it('it should UPDATE a member given the id', (done) => {
        chai.request(app)
            .put('/members/update/' + memberId)
            .send(memberToUpdate)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.member.should.have.property('nameMember').eql("test");
                done();
            });
    });
    after(async() => {
        let memberToDelete = await Member.findOne({
            where: { nameMember:'test' }
        });
        await memberToDelete.destroy();
    });
});

/**
 * * this thest assures 10 members per page
 * @param id is mandatory
 */
 describe("DELETE /members/delete/:id", ()=>{

    let memberId;

    before(async () => {
        const newMember = new Member(member);
        await newMember.save();
        memberId = newMember.dataValues.id;
    });

    it('it should DELETE a member given the id', (done) => {
        chai.request(app)
        .delete('/members/delete/' + memberId)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
    after(async() => {
        let memberToDelete = await Member.findOne({
            where: { nameMember:'test member' }
        });
        await memberToDelete.destroy();
    });
});