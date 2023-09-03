const passport= require('passport');
const Doctor= require('../models/doctor');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret'
    }
    
    
    passport.use(new JwtStrategy(opts, async (jwtPayLoad, done)=> {
        try{
        const user = await Doctor.findById(jwtPayLoad._id); 
        if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err){
              console.error("error in finding user from JWT");
              return done(err,false);
            }
          }));
//     var opts = {jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'secret',
//     issuer : 'accounts.examplesoft.com',
//     audience : 'localhost:8500'}


// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     Doctor.findOne({id: jwt_payload.id}, function(err, user) {
//         console.log(id);
//         if (err) {
//             console.error('Error in passport JWT strategy:', err);
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));
module.exports=passport;