import express from 'express';
import user from './routes/user';
import coops from './routes/coops';
import bidders from './routes/bidders';
import auction from './routes/auction';
import store from './routes/store';
import validators from './middleware/validations';
import db from './models';
import uuid from 'uuid';

const {Shop,Coffee} = db;
const app = express();

    
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// middleware validate emails and password strengthen
app.use('/api/v1/auth',validators.validateEmail);

app.use('/api/v1/auth',validators.validatePassword);

app.get('/', (req, res) => {
    res.status(200).send({message : 'welcome to agro-com app'})    
});


// Shop.create({
// 	name:'simba'
// }).then( shop =>{
// 	shop.createCoffee({
// 		name:'colombian',
// 		type:'dark'
// 	}).then(()=> {
// 		console.log('worked');
// 		console.log(uuid());
// 	});
// })

app.use(user);
app.use(coops);
app.use(bidders);
app.use(auction);
app.use(store);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app;
