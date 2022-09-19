let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const should = chai.should();
const app = require("../app");
const { News } = require("../db/models");

chai.use(chaiHttp);
const server = require("../app");
const token = process.env.TEST_TOKEN;

let newsTest = {
  name: "Title",
  content: "Content",
  image: "url_of_image",
  type: "news",
};

describe("Get all the news: ", () => {
  it("should get all the news", (done) => {
    chai
      .request(app)
      .get("/news")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should verify that there are 10 news in the page", (done) => {
    chai
      .request(server)
      .get("/news")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.response.items.length.should.be.eql(10);
        done();
      });
  });
});

describe("Get only one news", () => {
  it("should get one news by id", (done) => {
    let token = process.env.TEST_TOKEN_ADMIN;

    chai
      .request(server)
      .get("/news/1")
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        if (err) return err.message;
        res.body.should.be.a("object");
        done();
      });
  });

  it("should return status 404 if id doesn't exists", (done) => {
    let token = process.env.TEST_TOKEN_ADMIN;
    chai
      .request(server)
      .get("/news/" + "0")
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("should return status 403 if user is not authorized", (done) => {
    let token = process.env.TEST_TOKEN;
    chai
      .request(server)
      .get("/news/" + "0")
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should return authorization error if there isn't an Authorization token", (done) => {
    chai
      .request(server)
      .get("/news/" + "0")
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe("POST /news", () => {
  it("should return status 201", (done) => {
    let token = process.env.TEST_TOKEN_ADMIN;
    chai
      .request(server)
      .post("/news")
      .set({
        Authorization: token,
      })
      .send(newsTest)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should return an authorization error", (done) => {
    chai
      .request(server)
      .post("/news")
      .send(newsTest)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  after(async () => {
    const news = await News.findOne({
      where: { name: "Title" },
    });
    if (news) {
      console.log("news exists and will be deleted");
      await news.destroy();
    }
  });
});

describe("PUT /news", () => {
  let token = process.env.TEST_TOKEN_ADMIN;

  var newsId;

  before(async () => {
    const newNews = new News(newsTest);
    await newNews.save();
    newsId = newNews.dataValues.id;
  });

  it("should return status 200", (done) => {
    chai
      .request(server)
      .put("/news/" + newsId)
      .set({
        Authorization: token,
      })
      .send(newsTest)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return an authorization error", (done) => {
    chai
      .request(server)
      .put("/news/" + newsId)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should return status 404", (done) => {
    let token = process.env.TEST_TOKEN_ADMIN;
    chai
      .request(server)
      .put("/news/" + "0")
      .set({
        Authorization: token,
      })
      .send(newsTest)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("should return a validation error", (done) => {
    chai
      .request(server)
      .put("/news/" + newsId)
      .set({
        Authorization: token,
      })
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  after(async () => {
    const news = await News.findOne({
      where: { name: "Title" },
    });
    await news.destroy();
  });
});

describe("DELETE /news", () => {
  let token = process.env.TEST_TOKEN_ADMIN;

  var newsId;

  before(async () => {
    const newNews = new News(newsTest);
    await newNews.save();
    newsId = newNews.dataValues.id;
  });

  it("should return status 200", (done) => {
    chai
      .request(server)
      .delete("/news/" + newsId)
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return an authorization error", (done) => {
    chai
      .request(server)
      .delete("/news/" + newsId)
      .end((err, res) => {
        if(err => console.log(err));
        res.should.have.status(403);
        done();
      });
  });

  it("should return status 404", (done) => {
    let token = process.env.TEST_TOKEN_ADMIN;
    chai
      .request(server)
      .delete("/news/" + "0")
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  after(async () => {
    const testimony = await News.findOne({
      where: { name: "Title" },
    });
    await testimony.destroy();
  });
});
