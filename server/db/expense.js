const Bookshelf = require('./bookshelf');

require('./space');
const Expense = Bookshelf.Model.extend({
  tableName: 'expense',

  space: function() {
    return this.belongsTo('Space');
  },
});

module.exports = Bookshelf.model('Expense', Expense);
