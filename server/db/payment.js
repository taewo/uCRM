const Bookshelf = require('./bookshelf');

require('./billplan');
require('./member');

const Payment = Bookshelf.Model.extend({
  tableName: 'payment',

  billplan: function() {
    return this.belongsTo('BillPlan');
  },
  member: function() {
    return this.belongsTo('Member');
  },
});

module.exports = Bookshelf.model('Payment', Payment);
