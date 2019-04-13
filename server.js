const express = require('express');
const app = express();
const route = require('./app');

app.set('port', process.env.PORT || 3000);
app.set('views engines','ejs');
app.get('/',(req,res,next) => {
  res.status(200).send('connected')
})
app.listen(app.get('port'),()=> console.log('server is running on port 3000'));
