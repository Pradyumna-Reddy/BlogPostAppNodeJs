const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();

function router(nav) {
  const { getPost, getPostsList, storePost } = postController(nav);

  // postRouter.use(allowUsertoPostsRoute);

  postRouter.route('/')
    .get(getPostsList)
    .post(storePost);

  postRouter.route('/new')
    .get((req, res) => {
      res.render(
        'createPost',
        {
          title: 'Create Post',
          nav,
        },
      );
    });

  postRouter.route('/:id')
    .get(getPost);
  return postRouter;
}

module.exports = router;
