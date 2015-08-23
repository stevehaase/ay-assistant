var secrets = require('../config/secrets.js');
var clientSecret = secrets.gcal.clientSecret;
var clientId = secrets.gcal.clientID;
var redirectUrl = secrets.gcal.callbackURL;

var User = require('../models/User');

var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

var homeController = require('./home');

calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/calendar'
});

exports.url = calendar_auth_url;
exports.client = oauth2Client;

//for displaying the next 3 events on the home page


exports.next3 = function(user){
	console.log('running next3', user)
	var calendar = googleapis.calendar('v3');
	calendar.events.list({
		auth: oauth2Client,	
		calendarId: 'primary',
    	timeMin: (new Date()).toISOString(),
    	maxResults: 3,
    	singleEvents: true,
    	orderBy: 'startTime'
  	}, function(err, response) {
  		if (err){
  			console.log('The API returned an error: ' + err);
  			exports.events = 'No upcoming events found.';
  			return;	
  		} 
    	var threeEvents = response.items;
    	if (threeEvents.length == 0) {
      		exports.events = 'No upcoming events found.';
    	} else {	
    		exports.events = threeEvents;
      	}
    });
}


exports.setTokens = function(id, tokens){
	User.findById(id, function(err, user){
		if (err) console.log(err);
		user.gcal = tokens;
		user.save(function(err){
			if (err) console.log(err);
		})
	})
}