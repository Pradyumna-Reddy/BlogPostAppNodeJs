const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const posts = [
  {
    title: 'Roman',
    categories: 'Action',
    content: `Roman is a good boy
    Hahaha!`,
    creatorId: null,
  },
  {
    title: 'Blob',
    categories: 'Computers',
    content: `Blob is an object type
    Hahaha!`,
    creatorId: null,
  },
  {
    title: 'Golabo',
    categories: 'Adventure',
    content: `Golabo is a Footballer
    Hahaha!`,
    creatorId: null,
  },
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'blogpost';

      (async function query() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected...');

          const db = client.db(dbName);

          const response = await db.collection('posts').insertMany(posts);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
