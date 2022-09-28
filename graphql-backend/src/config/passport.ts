import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET_KEY } from './constants';
import { User, users } from './users';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY
}

passport.use(new JwtStrategy(options, (payload, done) => {
    const user = users.find(user => user.id == payload.id);

    if(!user) return done(null, false);

    return done(null, user);
}));

export default passport;
