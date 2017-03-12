const Bookshelf = require('./bookshelf');

const Token = Bookshelf.Model.extend({
  tableName: 'token',
});

module.exports = Bookshelf.model('Token', Token);
