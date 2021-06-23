const express = require('express');
const userController = require('../controllers/userController');

const postRouter = express.Router();

function router() {
  const {
    getPostsListOfUser, addPost, newPost, allowUsertoPostsRoute, getEditPost, storeEditPost,
    deletePost,
  } = userController();

  postRouter.use(allowUsertoPostsRoute);

  postRouter.route('/posts')
    .get(getPostsListOfUser);

  postRouter.route('/createPost')
    .get(newPost)
    .post(addPost);

  postRouter.route('/editPost/:id')
    .get(getEditPost)
    .post(storeEditPost);

  postRouter.route('/deletePost/:id')
    .get(deletePost);
  return postRouter;
}

module.exports = router;
