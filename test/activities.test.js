let chai = require('chai');
let chaiHttp = require('chai-http');
const { set } = require('../app');
const expect = require('chai').expect;
const app = require('../app');

chai.use(chaiHttp);



describe('get all activties: ', () => {
    it('should get all activities', (done) => {
        chai.request(app)
            .get('/activities')
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});


describe('Insert a activity: ', () => {
    let token = process.env.TEST_TOKEN;
    it('should insert a activity', (done) => {
        chai.request(app)
            .post('/activities')
            .set({ Authorization: token })
            .send({ id: 7, name: "Test", content: "Content test", image: "contentImage.jpg" })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});