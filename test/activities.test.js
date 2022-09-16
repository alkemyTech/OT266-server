let chai = require('chai');
let chaiHttp = require('chai-http');
const { set } = require('../app');
const expect = require('chai').expect;
const app = require('../app');

const { Activity } = require('../db/models');

chai.use(chaiHttp);

const token = process.env.TEST_TOKEN;

const activityTest = {
    name: "test",
    content: "Content test",
    image: "contentImage.jpg"
}



describe('get all activties', () => {
    it('should get all activities', (done) => {
        chai.request(app)
            .get('/activities')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});


describe('Insert a activity', () => {

    it('should insert a activity', (done) => {
        chai.request(app)
            .post('/activities')
            .set({ Authorization: token })
            .send(activityTest)
            .end(function(err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should return authorization error, status 403', (done) => {
        chai.request(app)
            .post('/activities')
            .send(activityTest)
            .end(function(err, res) {
                expect(res).to.have.status(403);
                done();
            });
    });

    it('should return a validation error, status 400', (done) => {
        chai.request(app)
            .post('/activities')
            .set({ Authorization: token })
            .send({ image: 'test' })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    after(async() => {
        const activity = await Activity.findOne({
            where: { name: 'test' }
        });
        if (activity) {
            await activity.destroy();
        }

    });
});


describe('update the activity', () => {

    var idTest;

    before(async() => {
        const newActivity = new Activity(activityTest);
        await newActivity.save();
        idTest = newActivity.dataValues.id;
    })

    it('should update name of activity, status 200', (done) => {
        chai.request(app)
            .put('/activities/' + idTest)
            .set({ Authorization: token })
            .send(activityTest)
            .end(function(err, res) {
                expect(res.body).to.have.property('name').to.be.equal('test');
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return activity not exist. status 404', (done) => {
        chai.request(app)
            .put('/activities/' + 0)
            .set({ Authorization: token })
            .send(activityTest)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should return authorization error, status 403', (done) => {
        chai.request(app)
            .put('/activities/' + idTest)
            .send(activityTest)
            .end(function(err, res) {
                expect(res).to.have.status(403);
                done();
            });
    });

    it('should return a validation error, status 400', (done) => {
        chai.request(app)
            .put('/activities/' + idTest)
            .set({ Authorization: token })
            .send()
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

});

// describe('delete activity', () => {

//     it('should delete activity, status 200', (done) => {
//         chai.request(app)
//             .get('/activities')
//             .end(function(err, res) {
//                 console.log(res.body)
//                 expect(res).to.have.status(200);
//                 chai.request(app)
//                     .del('/activities/30')
//                     .set({ Authorization: token })
//                     .end(function(err, res) {
//                         console.log(res.body)
//                         expect(res).to.have.status(200);
//                         chai.request(app)
//                             .get('/activities')
//                             .end(function(err, res) {
//                                 console.log(res.body)
//                                 expect(res).to.have.status(200);
//                                 done();
//                             });
//                     });
//             });
//     });
// });



// describe('delete activity with id 50: ', () => {
//     it('should show: Activity not exist.', (done) => {
//         chai.request(app)
//             .del('/activities/50')
//             .set({ Authorization: token })
//             .end(function(err, res) {
//                 console.log(res.body)
//                 expect(res).to.have.status(404);
//                 done();
//             });
//     });
// });