const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Blogposts', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });
  it('should list blogpost on GET', function() {
    return chai.request(app)
      .get('/blogposts')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['title', 'content', 'author', 'publishDate'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });

  it('should add a blogpost on POST', function() {
    const newItem = {title: 'Gaming Chairs', content: 'So Much Chairs', author: 'William Pratt', publishDate: '2010'};
    return chai.request(app)
      .post('/blogposts')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('title', 'content', 'author', 'publishDate');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  it('should update blogposts on PUT', function() {
    
    const updateData = {
      title: 'foo',
      content: 'Chairs',
      author: 'Harry',
      publishDate: '2010'
    };

    return chai.request(app)
      
      .get('/blogposts')
      .then(function(res) {
        updateData.id = res.body[0].id;
       
        return chai.request(app)
          .put(`/blogposts/${updateData.id}`)
          .send(updateData);
      })
     
      .then(function(res) {
        
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.deep.equal(updateData);
      });
  });

  it('should delete blogposts on DELETE', function() {
    return chai.request(app)
      
      .get('/blogposts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blogposts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});