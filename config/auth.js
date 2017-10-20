//auth config vars

module.exports = {
  'twitterAuth': {
    'clientID': process.env.TWITTER_KEY,
    'clientSecret': process.env.TWITTER_SECRET,
    'callbackURI': process.env.APP_URI + '/auth/twitter/callback' 
  }
};