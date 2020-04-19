const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const Buyer = require('../models/buyer')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    (accessToken, refreshToken, profile, cb) => {
      let newBuyer = new Buyer()
      newBuyer.save(err => {
        if (err) return cb(err)
        return cb(null, newBuyer)
      });
    }
  )
)

passport.serializeUser((buyer, done) => {
  done(null, buyer.id)
});

passport.deserializeUser((id, done) => {
  Buyer.findById(id, (err, buyer) => {
    done(err, buyer)
  });
});
