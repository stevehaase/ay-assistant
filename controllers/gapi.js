var secrets = require('../config/secrets.js');
var clientSecret = secrets.google.clientSecret;
var clientId = secrets.google.clientID;
var redirectUrl = secrets.google.callbackURL;

var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
});

exports.url = calendar_auth_url;

exports.client = oauth2Client;

exports.ping = function() {
    console.log('pong');
};

// Continue with this line: http://javascriptplayground.com/blog/2013/06/node-and-google-oauth/