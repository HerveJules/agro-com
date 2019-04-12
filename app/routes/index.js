const helper = require('../utilities');
const model=require('../db')
module.exports = () => {
    const routers ={
        'get':{
            '/':(req,res,next) => {
                res.render('index');
            },
            '/dashboard':(req,res,next) => {
                res.render('dashboard');
            },
            '/info':model.fetch
        },
        'post':{
            '/':model.rm,
            '/dashboard':(req,res,next) => {
                res.send('post page')
            },
            '/postuser':model.push,
            '/deleteuser':model.rm
        },
        '/put':{
            '/putuser':model.mv
        },
        'NA':(req,res,next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }
    return helper.routeBr(routers);
}
