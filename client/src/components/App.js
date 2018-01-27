import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import '../css/App.css';

import Header from './Header';

import rightArrow from '../img/right-arrow.png';
import menu from '../img/menu.png';

class App extends Component {
	state = {
		customers: [],
	}

	componentWillMount() {
		document.body.style.backgroundColor = `#FAFAFA`;
	}

	componentDidMount() {
		this.getCustomers();
	}

	getCustomers() {
		fetch('/customers')
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					this.props.history.push('/login');
				} else {
					this.setState({ customers: res.data })
				}
			});
	}


	newCustomerAdded() {
		this.getCustomers();
	}

	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Header name="Customers" page={1} newCustomerAdded={this.newCustomerAdded.bind(this)} />
					<div className="customers-body">
						{this.state.customers.map(customer =>
							<Link key={customer.recordId} to={{ pathname: `/customers/${customer.recordId}` }}>
								<div>
									<button key={customer.recordId} className="customer">
										{customer.fieldData.CustomerName}
										<img src={rightArrow} />
									</button>
								</div>
								<br />
							</Link>
						)}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
