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
var User = require('../models/User');

passport.authorize()

var gapi = require('../controllers/gapi');

exports.getAgenda = function(req, res, next){
  if (!req.user) return res.redirect('/login');
  console.log(gapi.client.credentials, req.user.gcal)
  if ((Object.keys(gapi.client.credentials).length == 0) && !req.user.gcal.access_token) return res.redirect('/auth/google/calendar');
  if ((Object.keys(gapi.client.credentials).length == 0) && req.user.gcal.access_token){
    gapi.client.credentials = req.user.gcal;
  }
  if (gapi.client.credentials){
    if (gapi.client.credentials.access_token != req.user.gcal.access_token){
      gapi.client.credentials = req.user.gcal;
    }
  }
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
      return res.redirect('/auth/google/calendar');
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

     

  
  //save this to the DB or to the app's local variables, so we can call it from the home page (and also save the Agenda items for the day)
  
}