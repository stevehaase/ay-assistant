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

/*
getAccessToken(oauth2Client, function() {
  // retrieve calendar
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
});
*/

exports.getAgenda = function(req, res, next){
	gapi.listEvents();

	/*var allTokens = req.user.tokens;
	var googleTokenArray = [];
	for (var i = 0; i < allTokens.length; i++) {
		if(allTokens[i].kind == 'google') googleTokenArray.push(allTokens[i]);
	}
	var googleToken = googleTokenArray[0].accessToken;
	authorize(secrets.google, googleToken, listEvents);*/
	res.render('calendar/agenda', {
		title: 'Agenda',
		agenda: 'call mom' 
	});
}
/*
function authorize(credentials, token, callback) {
  
  oauth2Client.getToken(token, function(err, tokens) {
  		if(err) console.log(err);
	  // Now tokens contains an access_token and an optional refresh_token. Save them.
	  if(!err) {
	    oauth2Client.setCredentials(tokens);
	  }
  });
  
  google.options({ auth: oauth2Client })
  console.log(oauth2Client);
  callback(oauth2Client);  
}


function listEvents(auth) {
  calendar.events.list({
    auth: auth,
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
}*/