import express from 'express';
import user from './routes/user';
import coops from './routes/coops';
import bidders from './routes/bidders';
import auction from './routes/auction';
import store from './routes/store';
import validators from './middleware/validations';
import db from './models';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { multerUploads} from './helpers/multer';

const {User,Coop} = db;
const app = express();

app.use(bodyParser.urlencoded({extended:true}))      
app.use(bodyParser.json());
app.use(multerUploads);
app.use('/api/v1/add',validators.validateEmail);

app.use('/api/v1/add',validators.validatePassword);

app.get('/', (req, res) => {
    res.status(200).send({message : 'welcome to agro-com app'}); 
});

// user page
app.get('/users', (req, res) => {
    res.status(200).send({message : 'welcome to users page'});    
});
// coops page
app.get('/coops', (req, res) => {
    res.status(200).send({message : 'welcome to coops'});   
});
// bidders page
app.get('/bidders', (req, res) => {
    res.status(200).send({message : 'welcome to bidders'});
});
// store page
app.get('/', (req, res) => {
    res.status(200).send({message : 'welcome to agro-com app'})    
});

// User.create({
// 	firstname:'simba',
// 	lastname:'kikongo',
// 	email:'herve@gmail.com',
// 	password:'123456Telphone'
// }).then( shop =>{
// 	shop.createCoop({
// 		tin:'123456489',
// 	}).then(()=> {
// 		console.log('worked');
// 	});
// }).catch(err =>{
// 	console.log(err + "2nd")
// })

app.use(user);
app.use(coops);
app.use(bidders);
app.use(auction);
app.use(store);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app;
