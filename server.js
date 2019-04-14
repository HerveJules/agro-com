const express = require('express');
const app = express();
const routev = require('./app');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine','ejs');
app.use('/',routev.routes);

app.listen(app.get('port'), () => {
    console.log('chatCat is running on port 3000');
})
