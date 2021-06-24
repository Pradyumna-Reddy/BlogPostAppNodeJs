const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:userController');
const getNavbar = require('./helpers/navLinksAdderHelper');
const { dbName, dbUrl } = require('../../constants');

function userController() {
  function getPostsListOfUser(req, res) {
    const nav = getNavbar(req);
    let posts;
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');

        const db = client.db(dbName);
        const collection = db.collection('posts');
        posts = await collection.find({ creatorId: req.user.username }).toArray();
      } catch (error) {
        debug(error.stack);
      }
      client.close();
      res.render('userPosts', {
        title: 'Posts',
        nav,
        posts,
      });
    }());
  }

  function newPost(req, res) {
    const nav = getNavbar(req);
    if (!req.user) {
      res.redirect('/auth/signIn');
    } else {
      res.render('createPost', {
        title: 'Create Post',
        nav,
      });
    }
  }

  function addPost(req, res) {
    const {
      title, description, content,
    } = req.body;
    let post;
    (async function storePost() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');

        const db = client.db(dbName);
        const collection = db.collection('posts');
        post = {
          title, description, content, creatorId: req.user.username,
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

  function getEditPost(req, res) {
    const nav = getNavbar(req);
    const { id } = req.params;
    debug(id);
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
      debug(post);
      client.close();
      res.render('editPost', {
        title: 'Edit',
        nav,
        post,
      });
    }());
  }

  function storeEditPost(req, res) {
    const {
      title, description, content,
    } = req.body;
    const { id } = req.params;
    let post;
    (async function storePost() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('posts');
        post = {
          _id: new ObjectID(id), title, description, content, creatorId: req.user.username,
        };
        const result = await collection.replaceOne({ _id: new ObjectID(id) }, post);
        debug(result);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
      res.redirect('/user/posts');
    }());
  }

  function deletePost(req, res) {
    const { id } = req.params;
    (async function storePost() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('posts');
        const result = await collection.remove({ _id: new ObjectID(id) });
        debug(result);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
      res.redirect('/user/posts');
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
    getEditPost,
    storeEditPost,
    getPostsListOfUser,
    addPost,
    deletePost,
    newPost,
    allowUsertoPostsRoute,
  };
}

module.exports = userController;
