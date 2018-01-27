const express = require('express');
const axios = require('axios');
const localStorage = require('localStorage');

// const authenticate = require('../middleware/authenticate').authenticate;


const router = express.Router();

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';

let LAYOUT		= "Home";

router.get('/', (req, res, next) => {
	console.log('hetetetetete');
	// console.log(localStorage.getItem('axios_token'), typeof localStorage.getItem('axios_token'));
	let request = JSON.parse(localStorage.getItem('axios_token'));
	// let request = localStorage.getItem('axios_token');
	request.method = 'post';
	request.url = `${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}`;
	request.data = {
		"data" : {
			"CustomerName": req.name,
			"Division": req.division
		}
	};

	axios(request)
			 .then(data => {
				 console.log(data);
				 return data.data})
			 .then(data => res.json(data))
			 .catch(e => {console.log('ADD CUSTOMER!!!!', e);});
 });

module.exports = router;
