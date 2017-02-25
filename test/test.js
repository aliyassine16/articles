var supertest = require('supertest');
var should = require('should');
var server = supertest.agent('http://localhost:3000');


describe("test of the list of articles function ", function () {
    it("should reply with the json list of articles", function (done) {


        server
            .get("/api/listArticles")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {

                console.log(res.body);
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.data.articles[0].id.should.equal(100);
                done();

            });
    });
});


describe("Random api call", function () {


    it("should return 404 /random", function (done) {
        server
            .get("/random")
            .expect(404)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    })
});