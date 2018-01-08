const express = require('express');
const axios = require('axios');
const localStorage = require('localStorage');

// const authenticate = require('../middleware/authenticate').authenticate;


const router = express.Router();

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';

let LAYOUT		= "Home";
// let LAYOUT		= "User";
// router.use(authenticate);

// const SERVERURL	= 'https://itools.isolutions.fm';
// const DB		= 'TimeTracker';

/* GET users listing. */
// router.use(authenticate);

router.get('/', (req, res, next) => {
	// console.log('!!!!', req.axios);
	// req.axios.get(`${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}`)
	axios.get(`${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}`, JSON.parse(localStorage.getItem('axios_token')))
			 .then(data => data.data)
			 .then(data => res.json(data))
			 .catch(e => res.json({error: "Error when fetching customers"}));
			 // .catch(e => res.json({error: "Error occured."}));
});

module.exports = router;
