const express = require('express');
const axios = require('axios');
const localStorage = require('localStorage');

const router = express.Router();

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';


router.get('/', (req, res, next) => {
	let request = JSON.parse(localStorage.getItem('axios_token'));
	request.method = 'delete';
	request.url = `${SERVERURL}${APITOKEN}/auth/${DB}`;
	axios(request)
			 .then(data => data.data)
			 .then(data => res.json(data))
			 .catch(e => res.json({error: "Error logging out."}));
});

module.exports = router;
