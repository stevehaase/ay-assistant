var http = require('http');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

exports.postUser = function(req){
	var postData = querystring.stringify({
		'email': req.user.email,
		'hs_context': {"hutk": req.cookies.hubspotutk}
	})

	var options = {
		hostname: 'forms.hubspot.com',
		path: '/uploads/form/v2/161221/c91d2ac8-7c29-4ec0-9a45-ee993ee4b19b',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}
	}

	var request = http.request(options, function(response){
		console.log("Status: " + response.statusCode);
		console.log("Headers: " + JSON.stringify(response.headers));
		response.setEncoding('utf8');
		response.on('data', function(chunk){
			console.log('Body: ' + chunk)
		});
	});

	request.on('error', function(e){
		console.log("Problem with request " + e.message)
	});

	request.write(postData);
	request.end();

}


