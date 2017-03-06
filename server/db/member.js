const Bookshelf = require('./bookshelf');

require('./space');
require('./payment');

const Member = Bookshelf.Model.extend({
  tableName: 'member',

  space: function() {
    return this.belongsTo('Space');
  },
  payment: function() {
    return this.hasMany('Payment');
  },
});

module.exports = Bookshelf.model('Member', Member);
