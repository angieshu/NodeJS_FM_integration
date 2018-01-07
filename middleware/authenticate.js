const axios = require('axios');
const localStorage = require('localStorage');

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';
// const SERVERURL	= 'https://itools.isolutions.fm';
// const DB		= 'TimeTracker';

let USERNAME	= "admin";
let PASSWORD	= "password";
let LAYOUT		= "Home";
// let PASSWORD = "admin";
// let LAYOUT		= "User";

// console.log('in authenticate');

module.exports = {
	authenticate(req, res, next) {
		console.log('autenticate', JSON.parse(localStorage.getItem('user')));
		const creds = {
			"user": req.body.accountName,
			"password": req.body.accountPassword,
			"layout": LAYOUT
		};

		axios.post(`${SERVERURL}${APITOKEN}/auth/${DB}`, creds)
		.then(response => response.data)
		.then(auth => {
			req.axios = axios.create({
				headers: { 'FM-Data-token': auth.token }
			});
			// res.json({success: "Authentication successfull"});
			next();
		})
		.catch(e => res.status(401).json({error: "Authentication failed."}));
	}
}
