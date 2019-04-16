import passport from 'passport';
import localStrategy from 'passport-local';
import passportJWT from 'passport-jwt';

// const LocalStrategy = localStrategy.Strategy;

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secret'
    },
    function (jwtPayload, done) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));
