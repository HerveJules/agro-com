import db from '../models';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import secret from '../config/secretKey';
const {User} = db;
const secretKey = secret.secretKey;
const jwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt; 


passport.use( 'jwt', new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
        secretOrKey   : secretKey
    },async (Payload, done) => {


       try{
             //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            const userFind = await User.findOne({ where: { id:Payload.id}})
            
            // if not exist, handle it

            if(!userFind){
                return done(null,false);
            }

            // if exist handle it

            else{
                // console.log(userFind.role === 'Eax');
                const role = {
                    isEax:userFind =>{

                        if (userFind.role === "Eax") {
                            return true;
                        }else{
                            return false;
                        }
                    },
                    isCoop:userFind =>{
                        if (userFind.role === "Coop") {
                            return true;
                        } else {
                            return false
                        }
                    },
                    isBidder:userFind =>{
                        if (userFind.role === "Bidder") {
                            return true;
                        } else {
                            return false;
                        }
                    },
                }
                done(null,{
                    userFind,
                    role
                });
                
            }
       }catch(error){
            done(error,false);
       }
    }
));
