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

describe("GET /testimony", ()=>{
    it("should return status 200", (done) => {
         chai.request(server)
            .get('/testimony')
            .set({
                Authorization: token
            })
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            })
    })

    it("should verify that there are 10 testimonies in the page", (done) => {
        chai.request(server)
        .get('/testimony')
        .set({
            Authorization: token
        })
        .end((err,res)=>{
            res.body.should.be.a('object');
            res.body.response.items.length.should.be.eql(10);
            done()
        })
    })

    it("should return an authorization error", (done) => {
        chai.request(server)
           .get('/testimony')
           .end((err,res)=>{
               res.should.have.status(403);
               done()
           })
   })
})

describe("GET ONE /testimony", ()=>{

    it("should return status 200", (done) => {
         let token = process.env.TEST_TOKEN;
         let id = 2;
         chai.request(server)
            .get('/testimony/' + id)
            .set({
                Authorization: token
            })
            .end((err,res)=>{
                res.body.should.be.a('object');
                res.body.should.have.property('testimony');
                res.should.have.status(200);
                done()
            })
    })

    it("should return an authorization error", (done) => {
        chai.request(server)
           .get('/testimony/' + '2')
           .end((err,res)=>{
               res.should.have.status(403);
               done()
           })
    })

    it("should return status 404", (done) => {
        let token = process.env.TEST_TOKEN;
        chai.request(server)
           .get('/testimony/' + '0')
           .set({
               Authorization: token
           })
           .end((err,res)=>{
               res.should.have.status(404);
               done()
           })
    })
})

describe("POST /testimony", ()=>{
    it("should return status 201", (done) => {
        chai.request(server)
            .post('/testimony')
            .set({
                Authorization: token
            })
            .send(testimonyTest)
            .end((err,res)=>{
                res.should.have.status(201);
                done()
            })
    })

    it("should return an authorization error", (done) => {
        chai.request(server)
           .post('/testimony')
           .send(testimonyTest)
           .end((err,res)=>{
               res.should.have.status(403);
               done()
           })
    })

    it("should return a validation error", (done) => {
        chai.request(server)
           .post('/testimony')
           .set({
                Authorization: token
            })
           .send({image: 'test'})
           .end((err,res)=>{
               res.should.have.status(400);
               done()
           })
    })

    after(async () =>{
        const testimony = await Testimony.findOne({
            where: {name:'test'}
        });
        if(testimony){
            await testimony.destroy();
        }
    })
})

describe("PUT /testimony", ()=>{

    var newId;

    before(async () => {
        const newTestimony = new Testimony(testimonyTest);
        await newTestimony.save();
        newId = newTestimony.dataValues.id;
    })
    

    it("should return status 200", (done) => {
        chai.request(server)
            .put('/testimony/' + newId)
            .set({
                Authorization: token
            })
            .send(testimonyTest)
            .end((err,res)=>{
                res.should.have.status(200);
                done()
            })
    })

    it("should return an authorization error", (done) => {
        chai.request(server)
           .put('/testimony/' + newId)
           .end((err,res)=>{
               res.should.have.status(403);
               done()
           })
    })

    it("should return status 404", (done) => {
        let token = process.env.TEST_TOKEN;
        chai.request(server)
           .put('/testimony/' + "0")
           .set({
               Authorization: token
           })
           .send(testimonyTest)
           .end((err,res)=>{
               res.should.have.status(404);
               done()
           })
    })

    it("should return a validation error", (done) => {
        chai.request(server)
           .put('/testimony/' + newId)
           .set({
                Authorization: token
            })
           .send({})
           .end((err,res)=>{
               res.should.have.status(400);
               done()
           })
    })

    after(async () => {
        const testimony = await Testimony.findOne({
            where: {name:'test'}
        });
        await testimony.destroy();
    })
})

describe("DELETE /testimony", ()=>{
    var newId;

    before(async () => {
        const newTestimony = new Testimony(testimonyTest);
        await newTestimony.save();
        newId = newTestimony.dataValues.id;
    })

    it("should return status 200", (done) => {
        chai.request(server)
            .delete('/testimony/' + newId)
            .set({
                Authorization: token
            })
            .end((err,res)=>{
                res.should.have.status(200);
                done()
            })
    })

    it("should return an authorization error", (done) => {
        chai.request(server)
           .delete('/testimony/' + newId)
           .end((err,res)=>{
               res.should.have.status(403);
               done()
           })
    })

    it("should return status 404", (done) => {
        let token = process.env.TEST_TOKEN;
        chai.request(server)
           .delete('/testimony/' + "0")
           .set({
               Authorization: token
           })
           .end((err,res)=>{
               res.should.have.status(404);
               done()
           })
    })

    after(async () => {
        const testimony = await Testimony.findOne({
            where: {name:'test'}
        });
        await testimony.destroy();
    })
}) 