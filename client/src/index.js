import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import App from './components/App';
import Customer from './components/Customer';
import Media from './components/Media';

import './css/index.css';

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route exact path='/login' component={Login} />
			<Route exact path='/' component={App} />
			<Route exact path='/customers/:recordId' render={(props) => <Customer {...props} />} />
			<Route exact path='/customers/:recordId/media/:customerId' render={(props) => <Media {...props} />} />
		</div>
	</BrowserRouter>,
	document.getElementById('root'));
// registerServiceWorker();
