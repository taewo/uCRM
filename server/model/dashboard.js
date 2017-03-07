const Dashboard = require('../functions/dashboard');
// const Space = require('../functions/space');

module.exports = {
  get: (req) => {
    const currentUser = req.session.passport.user;
    // let dashboardList = [];
    console.log('sur',currentUser);

    if (currentUser.type === 'staff') {
      const spaceid = currentUser.space_id;
      return Dashboard(spaceid);
    } else if (currentUser.type === 'comp') {
      return new Promise((resolve, reject) => {
        const container = []
        if (currentUser.spaceList) {
          currentUser.spaceList.forEach((space) => {
            container.push(Dashboard(space));
          });
          console.log(container);
        }
        Promise.all(container)
        .then((res) => {
          return resolve(res);
        });
      });
    }
  },
}
