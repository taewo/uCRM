const Expense = require('../functions/expense');

module.exports = {
  post: (req) => {
    const currentUser = req.session.passport.user;
    console.log('sur', currentUser);

    if (currentUser.type === 'comp') {
      return Expense.approveNewStaff(req.body)
      .then(result => (result));
    }
    return Promise.reject('Error: not authorized request.');
  },
};
