const express = require('express');
const axios = require('axios');
const localStorage = require('localStorage');

const router = express.Router();

const SERVERURL	= 'https://isolutions.fm';
const APITOKEN	= '/fmi/rest/api';
const DB		= 'RideAlong';

let LAYOUT		= "Customer_Info";
// let LAYOUT		= "User";

// const SERVERURL	= 'https://itools.isolutions.fm';
// const DB		= 'TimeTracker';

// router.use(authenticate);

router.get('/', (req, res, next) => {
	// console.log(req.recordId);
	// localStorage.getItem('axios').get(`${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}/${req.recordId}`)
	// req.axios.get(`${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}/${req.recordId}`)
	axios.get(`${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}/${req.recordId}`, JSON.parse(localStorage.getItem('axios_token')))
			 // .then(data => console.log(data))
			 .then(data => data.data)
			 .then(data => res.json(data))
			 .catch(e => res.json({error: "Error when fetching customer info."}));

});

module.exports = router;
