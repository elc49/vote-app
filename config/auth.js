//Authentication keys

module.exports = {
  twitter: {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://localhost:8080/auth/twitter/callback'
  }
};