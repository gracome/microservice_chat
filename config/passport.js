var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('../src/auth/private_keys');
const passport = require("passport");
const sequelize = require('../src/db/sequelize')
const { DataTypes } = require("sequelize")
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    sequelize.query(
        `SELECT * FROM "user" WHERE "user"."id"=$1`,
        {
            bind: [jwt_payload.id],
        }
      )
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          else {
            return done(null, false);
            // or you could create a new account
          }
        })
        .catch(err => {
          if (err) {
              return done(err, false);
          }
        });
  })
);