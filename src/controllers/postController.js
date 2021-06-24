const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:postController');
const getNavbar = require('./helpers/navLinksAdderHelper');
const { dbName, dbUrl } = require('../../constants');

function postController() {
  function getPostsList(req, res) {
    const nav = getNavbar(req);
    let posts;
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('posts');
        posts = await collection.find().toArray();
      } catch (error) {
        if (!client) {
          debug('No mongo connection established!');
        }
        debug(error.stack);
      }
      if (client) {
        client.close();
        res.render('index', {
          title: 'Posts',
          nav,
          posts,
        });
      } else {
        res.end('No mongo connection');
      }
    }());
  }

  function getPost(req, res) {
    const nav = getNavbar(req);
    const { id } = req.params;
    let post;
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('posts');
        post = await collection.findOne({ _id: new ObjectID(id) });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
      res.render('postDetailsView', {
        title: post.title,
        nav,
        post,
      });
    }());
  }

  return {
    getPostsList,
    getPost,
  };
}

module.exports = postController;
