import express from 'express';
import user from './routes/user';
import coops from './routes/coops';
import bidders from './routes/bidders';
import auction from './routes/auction';
import store from './routes/store';
import db from './models';
import path from 'path';
import hbs from 'express-handlebars';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { multerUploads} from './helpers/multer';
import cookieParser from 'cookie-parser';
import passport from 'passport';


const {User,Coop} = db;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',hbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({extended:true}))      
app.use(bodyParser.json());
app.use(multerUploads);
app.use(cookieParser());
app.use('/',function(req, res, next) {  
    req.headers['Authorization'] = req.cookies["Authorization"]
    next();
})
app.use(user);
app.use(coops);
app.use(bidders);
app.use(auction);
app.use(store);
// app.get('/', (req, res) => {
//     res.render('all-users');
// });

// user page

app.get('/', (req, res,next) => {

    res.sendFile(path.join(__dirname, '../src/views', 'login.html'));    
});
// app.get('/api/', (req, res,next) => {
// 	console.log(req.cookies["Authorization"]);

	
// 	res.send({
// 		he:req.headers
// 	})

//     if (req.cookies) {
//     	req.headers[req.cookies];
//     	next()
//     } else {
//     	res.sendFile(path.join(__dirname, '../src/views', 'login.html')); 
//     } 
// });

app.get('/api/d',passport.authenticate('jwt',{session:false}), (req, res) => {
	// console.log(req.user);
	res.render('index',{
		user:req.user.userFind
	})
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views', 'register.html'));    
});
// // coops page
// app.get('/coops', (req, res) => {
//     res.status(200).send({message : 'welcome to coops'});   
// });
// // bidders page
// app.get('/bidders', (req, res) => {
//     res.status(200).send({message : 'welcome to bidders'});
// });
// // store page
// app.get('/', (req, res) => {
//     res.status(200).send({message : 'welcome to agro-com app'})    
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app;
