import db from '../models';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import secret from '../config/secretKey';
const {users} = db;
const secretKey = secret.secretKey;
const jwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt; 


passport.use( new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey   : secretKey
    },async (Payload, done) => {

       try{
             //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            const userFind = await users.findOne({ where: { id:Payload.id}})
            
            // if not exist, handle it

            if(!userFind){
                return done(null,false);
            }

            // if exist handle it

            else{
                done(null,userFind);
                
            }
       }catch(error){
        done(error,false);
       }
    }
));
