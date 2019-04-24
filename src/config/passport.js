import {users} from '../models';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import secret from '../config/secretKey';
const secretKey = secret.secretKey;
const jwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt; 


passport.use( new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
        secretOrKey   : 'agro-comauthorisationcode'
    },async (Payload, done) => {

       try{
         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        const findById = await users.find({where :{id:Payload.id}})

        // if not exist, handle it

        if(!findById){
            console.log(findById);
            return done(null,false);
        }

        // if exist handle it

        else{
            console.log(findById);
            done(null,findById);
        }
       }catch(error){
        done(error,false);
       }
    }
));
