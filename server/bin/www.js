const app = require('../app');

const port = '4000';
app.set('port', port);

app.listen(port, () => {
  console.log('connected uCRM server 4000 port!');
});
