const Bookshelf = require('./bookshelf');

require('./company');
const Admin = Bookshelf.Model.extend({
  tableName: 'admin',

  company: function() {
    return this.belongsTo('Company');
  },
});

module.exports = Bookshelf.model('Admin', Admin);
