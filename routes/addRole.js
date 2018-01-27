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
	console.log('addding roooles');
	let request = JSON.parse(localStorage.getItem('axios_token'));
	request.method = 'put';
	request.url = `${SERVERURL}${APITOKEN}/record/${DB}/${LAYOUT}/${req.recordId}`;
	request.data = {
		"data" : {
			// "roles::role": req.role,
			"Roles::Role": req.role,
			// "CustomerName": "changedAlina"
		}
	};
	axios(request)
			 .then(data => data.data)
			 .then(data => res.json(data))
			 // .catch(e => res.json("Error adding role."));
			 .catch(e => { console.log('addRole',e) });
});

module.exports = router;
