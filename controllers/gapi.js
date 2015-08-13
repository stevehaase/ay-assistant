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





exports.listEvents = function(auth) {
  var calendar = googleapis.calendar('v3');
  calendar.events.list({
    auth: oauth2Client,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}


exports.ping = function() {
    console.log('pong');
};

// Continue with this line: http://javascriptplayground.com/blog/2013/06/node-and-google-oauth/