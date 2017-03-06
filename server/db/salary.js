const Bookshelf = require('./bookshelf');

require('./space');
require('./staff');
const Salary = Bookshelf.Model.extend({
  tableName: 'salary',

  space: function() {
    return this.belongsTo('Space');
  },
  staff: function() {
    return this.belongsTo('Staff');
  },
});

module.exports = Bookshelf.model('Salary', Salary);
