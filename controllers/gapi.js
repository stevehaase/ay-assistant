var secrets = require('../config/secrets.js');
var clientSecret = secrets.gcal.clientSecret;
var clientId = secrets.gcal.clientID;
var redirectUrl = secrets.gcal.callbackURL;

var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);


calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/calendar'
});

exports.url = calendar_auth_url;
exports.client = oauth2Client;


// Continue with this line: http://javascriptplayground.com/blog/2013/06/node-and-google-oauth/