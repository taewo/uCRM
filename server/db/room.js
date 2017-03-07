const Bookshelf = require('./bookshelf');

require('./space');
require('./reservation');

const Room = Bookshelf.Model.extend({
  tableName: 'room',

  space: function() {
    return this.belongsTo('Space');
  },
  reservation: function() {
    return this.hasMany('Reservation');
  },
});

module.exports = Bookshelf.model('Room', Room);
