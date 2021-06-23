const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authController');
const getNavbar = require('./helpers/navLinksAdderHelper');
const { dbName, dbUrl } = require('../../constants');

function authController() {
  function getSignUp(req, res) {
    const nav = getNavbar(req);
    res.render(
      'signUpView',
      {
        nav,
        title: 'Sign Up',
        message: req.query.message,
      },
    );
  }

  function getSignInForm(req, res) {
    const nav = getNavbar(req);
    res.render(
      'signInView',
      {
        nav,
        title: 'Sign In',
        message: req.query.message,
      },
    );
  }

  function postUser(req, res) {
    const { username, password } = req.body;
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected...');
        const db = client.db(dbName);
        const collection = db.collection('users');
        if (await collection.count({ username })) {
          res.redirect('/auth/signUp?message=1');
        } else {
          const user = { username, password };
          const result = await collection.insertOne(user);
          debug(result);
          req.login(result.ops[0], () => {
            res.redirect('/posts/');
          });
        }
      } catch (error) {
        debug(error);
      }
      client.close();
    }());
  }

  return { getSignUp, postUser, getSignInForm };
}
module.exports = authController();
