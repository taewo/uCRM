const Bookshelf = require('./bookshelf');

require('./admin');
require('./space');
require('./billingplan');
const Company = Bookshelf.Model.extend({
  tableName: 'company',

  admin: function() {
    return this.hasMany('Admin');
  },
  space: function() {
    return this.hasMany('Space');
  },
  billingplan: function() {
    return this.hasMany('BillingPlan');
  },
});

module.exports = Bookshelf.model('Company', Company);
