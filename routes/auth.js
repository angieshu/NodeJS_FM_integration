const express = require('express');
const axios = require('axios');
const localStorage = require('localStorage');
//
// const authenticate = require('../middleware/authenticate').authenticate;

const router = express.Router();

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';

let LAYOUT		= "Home";

// router.use(authenticate);

router.post('/', (req, res, next) => {
	const creds = {
		"user": req.body.accountName,
		"password": req.body.accountPassword,
		"layout": LAYOUT
	};

	// console.log('creds', creds);

	axios.post(`${SERVERURL}${APITOKEN}/auth/${DB}`, creds)
		 .then(response => response.data)
		 .then(response => {
			 let headers = { 'headers': { 'FM-Data-token': response.token } };
			 localStorage.setItem('axios_token', JSON.stringify(headers));
			 res.status(200).json({succes: "Authentication successfull."})
		 })
		 // .catch(e => console.log(e));
		 .catch(e => res.status(401).json({error: "Authentication failed."}));
});

module.exports = router;
