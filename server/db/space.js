const Bookshelf = require('./bookshelf');

require('./company');
require('./lead');
require('./member');
require('./staff');
require('./room');
require('./expense');
require('./activity');
require('./billingplan');

const Space = Bookshelf.Model.extend({
  tableName: 'space',

  company: function() {
    return this.belongsTo('Company');
  },
  lead: function() {
    return this.hasMany('Lead');
  },
  member: function() {
    return this.hasMany('Member');
  },
  staff: function() {
    return this.hasMany('Staff');
  },
  room: function() {
    return this.hasMany('Room');
  },
  expense: function() {
    return this.hasMany('Expense');
  },
  activity: function() {
    return this.hasMany('Activity');
  },
  activity: function() {
    return this.hasMany('BillingPlan');
  },
});

module.exports = Bookshelf.model('Space', Space);
