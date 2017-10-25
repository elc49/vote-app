//Authentication keys

module.exports = {
  twitter: {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'https://opinion-polling.herokuapp.com/auth/twitter/callback'
  }
};