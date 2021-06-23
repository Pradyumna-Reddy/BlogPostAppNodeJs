const { MongoClient } = require('mongodb');
const debug = require('debug')('app:dbHelper');

function returnsDbClient() {
  const url = process.env.DB_URL;
  const client = MongoClient.connect(url);
  debug('Connected...');
  return client;
}
exports.returnsDbClient = returnsDbClient;
