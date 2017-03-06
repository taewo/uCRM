const Bookshelf = require('./bookshelf');

require('./company');
require('./payment');
const BillingPlan = Bookshelf.Model.extend({
  tableName: 'billingplan',

  company: function() {
    return this.belongsTo('Company');
  },
  payment: function() {
    return this.hasMany('Payment');
  },
});

module.exports = Bookshelf.model('BillingPlan', BillingPlan);
