const app = require('../app');

const port = '3000';
app.set('port', port);

app.listen(port, ()=> {
  console.log('connected uCRM server 3000 port!');
});
