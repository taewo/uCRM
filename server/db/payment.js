const Bookshelf = require('./bookshelf');

require('./billingplan');
require('./member');
const Payment = Bookshelf.Model.extend({
  tableName: 'payment',

  billingplan: function() {
    return this.belongsTo('BillingPlan');
  },
  member: function() {
    return this.belongsTo('Member');
  },
});

module.exports = Bookshelf.model('Payment', Payment);
