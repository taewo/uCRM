const Bookshelf = require('./bookshelf');

require('./room');

const Reservation = Bookshelf.Model.extend({
  tableName: 'reservation',

  room: function() {
    return this.belongsTo('Room');
  },
});

module.exports = Bookshelf.model('Reservation', Reservation);
