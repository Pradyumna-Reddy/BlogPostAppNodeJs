const { MongoClient } = require('mongodb');
const debug = require('debug')('app:dbHelper');

function returnsDbClient() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'blogpost';
  const client = MongoClient.connect(url);
  debug('Connected...');
  return client;
}
exports.returnsDbClient = returnsDbClient;
