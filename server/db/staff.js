const Bookshelf = require('./bookshelf');

require('./space');
require('./salary');
const Staff = Bookshelf.Model.extend({
  tableName: 'staff',

  space: function() {
    return this.belongsTo('Space');
  },
  salary: function() {
    return this.hasOne('Salary');
  },
});

module.exports = Bookshelf.model('Staff', Staff);
