const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();

function router() {
  const {
    getPost, getPostsList,
  } = postController();

  postRouter.route('/')
    .get(getPostsList);

  postRouter.route('/:id')
    .get(getPost);
  return postRouter;
}

module.exports = router;
