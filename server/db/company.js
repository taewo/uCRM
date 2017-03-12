const Bookshelf = require('./bookshelf');

require('./admin');
require('./space');

const Company = Bookshelf.Model.extend({
  tableName: 'company',

  admin: function() {
    return this.hasMany('Admin');
  },
  space: function() {
    return this.hasMany('Space');
  },
});

module.exports = Bookshelf.model('Company', Company);
