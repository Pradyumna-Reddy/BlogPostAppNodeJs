const express = require('express');
const passport = require('passport');
const { getSignUp, postUser, getSignInForm } = require('../controllers/authController');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .get(getSignUp)
    .post(postUser);

  authRouter.route('/signIn')
    .get(getSignInForm)
    .post(passport.authenticate(
      'local',
      {
        successRedirect: '/posts/',
        failureRedirect: '/auth/signIn?message=1',
      },
    ));

  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });
  return authRouter;
}

module.exports = router;
