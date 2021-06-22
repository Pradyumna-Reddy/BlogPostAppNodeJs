const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();

function router(nav) {
  const { getPost, getPostsList, addPost } = postController(nav);

  // postRouter.use(allowUsertoPostsRoute);

  postRouter.route('/')
    .get(getPostsList)
    .post(addPost);

  postRouter.route('/new')
    .get((req, res) => {
      if (!req.user) {
        res.redirect('/auth/signIn');
      } else {
        res.render(
          'createPost',
          {
            title: 'Create Post',
            nav,
          },
        );
      }
    });

  postRouter.route('/:id')
    .get(getPost);
  return postRouter;
}

module.exports = router;
