const DBConnection = require('../keys/keys').AWSdb;
const knex = require('knex')({
  client: 'mysql',
  connection: DBConnection,
  pool: { min: 0, max: 7 },
});

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
