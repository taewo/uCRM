const app = require('../app');
const path = require('path');

const port = '4000';
app.set('port', port);

app.listen(port, ()=> {
  console.log('connected uCRM server 4000 port!');
  console.log(path.join(__dirname, '../../client/public'));
});
