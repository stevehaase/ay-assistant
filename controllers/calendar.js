var User = require('../models/User');
var google = require('googleapis');
var secrets = require('../config/secrets.js');
var clientSecret = secrets.google.clientSecret;
var clientId = secrets.google.clientID;
var redirectUrl = secrets.google.callbackURL;
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
var calendar = google.calendar('v3');

var passport = require('passport');

passport.authorize()

var gapi = require('../controllers/gapi');


exports.getAgenda = function(req, res, next){
  if (!gapi.client.credentials) return res.redirect('/auth/google/calendar');
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: gapi.client,
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
      }
    }
    res.locals.agenda = events;
    res.render('calendar/agenda', {
		title: 'Agenda'
	});
  });


}