const Bookshelf = require('./bookshelf');

require('./space');

const Activity = Bookshelf.Model.extend({
  tableName: 'activity',

  space: function() {
    return this.belongsTo('Space');
  },
});

module.exports = Bookshelf.model('Activity', Activity);
