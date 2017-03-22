const Bookshelf = require('./bookshelf');

const PaymentMember = Bookshelf.Model.extend({
  tableName: 'payment_member',
});

module.exports = Bookshelf.model('payment_member', PaymentMember);
