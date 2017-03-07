const Bookshelf = require('./bookshelf');

require('./space');

const Lead = Bookshelf.Model.extend({
  tableName: 'lead',

  space: function() {
    return this.belongsTo('Space');
  },
});

module.exports = Bookshelf.model('Lead', Lead);
