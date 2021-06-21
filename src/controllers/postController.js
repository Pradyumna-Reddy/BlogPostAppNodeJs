const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:postController');

function postController(nav) {
  function getPostsList(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'blogpost';
    let posts;
    (async function query() {
      let client;
      try {
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
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'blogpost';
    let post;
    (async function mongo() {
      let client;
      try {
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

  function storePost(req, res) {
    const {
      title, description, category, content,
    } = req.body;

    const url = 'mongodb://localhost:27017';
    const dbName = 'blogpost';
    let post;
    (async function addPost() {
      let client;
      try {
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
    storePost,
    allowUsertoPostsRoute,
  };
}

module.exports = postController;
