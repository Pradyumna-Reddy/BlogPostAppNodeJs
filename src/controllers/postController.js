const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:postController');
const navLinksAdder = require('./helpers/navLinksAdderHelper');

function postController(nav) {
  function getPostsList(req, res) {
    navLinksAdder(req, nav);
    let posts;
    (async function query() {
      let client;
      try {
        const url = 'mongodb://localhost:27017';
        const dbName = 'blogpost';
        client = await MongoClient.connect(url);
        debug('Connected...');

        const db = client.db(dbName);

        const collection = db.collection('posts');

        posts = await collection.find().toArray();
      } catch (error) {
        debug(error.stack);
      }
      client.close();
      res.render(
        'index',
        {
          title: 'Posts',
          nav,
          posts,
        },
      );
    }());
  }

  function getPost(req, res) {
    navLinksAdder(req, nav);
    const { id } = req.params;
    let post;
    (async function mongo() {
      let client;
      try {
        const url = 'mongodb://localhost:27017';
        const dbName = 'blogpost';
        client = await MongoClient.connect(url);
        debug('Connected...');

        const db = client.db(dbName);

        const collection = db.collection('posts');

        post = await collection.findOne({ _id: new ObjectID(id) });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
      res.render(
        'post',
        {
          nav,
          post,
        },
      );
    }());
  }

  function addPost(req, res) {
    navLinksAdder(req, nav);
    const {
      title, description, category, content,
    } = req.body;

    let post;
    (async function storePost() {
      let client;
      try {
        const url = 'mongodb://localhost:27017';
        const dbName = 'blogpost';
        client = await MongoClient.connect(url);
        debug('Connected...');

        const db = client.db(dbName);

        const collection = db.collection('posts');

        post = {
          title, description, category, content, creatorId: req.user,
        };
        const result = await collection.insertOne(post);
        debug(result);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
      res.redirect('/posts/');
    }());
  }

  function allowUsertoPostsRoute(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/signIn');
    }
  }

  return {
    getPostsList,
    getPost,
    addPost,
    allowUsertoPostsRoute,
  };
}

module.exports = postController;
