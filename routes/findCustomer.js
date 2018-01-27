const express = require('express');
const axios = require('axios');
const localStorage = require('localStorage');

const router = express.Router();

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';

let LAYOUT		= "Customers";
// let LAYOUT		= "User";

// const SERVERURL	= 'https://itools.isolutions.fm';
// const DB		= 'TimeTracker';

// router.use(authenticate);

router.get('/', (req, res, next) => {
	let request = JSON.parse(localStorage.getItem('axios_token'));
	request.method = 'post';
	request.url = `${SERVERURL}${APITOKEN}/find/${DB}/${LAYOUT}`;
	request.data = {
		'query': [{ "CustomerName": req.customerName }]
	};
	axios(request)
			 .then(data => data.data)
			 .then(data => res.json(data))
			 .catch(e => res.json({error: "Error finding a customer"}));
});

module.exports = router;
