import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';

class App extends Component {
	state = { customers: [] }

	componentDidMount() {
		console.log('in the app');
		fetch('/customers')
			.then(res => res.json())
			.then(customers => this.setState({ customers: customers.data }));
	}

	render() {
		return (
			<div className="App">
				<h3>Customers</h3>
				{this.state.customers.map(customer =>
					<Link key={customer.recordId} to={{ pathname: `/customers/${customer.recordId}` }}>
						<div key={customer.recordId}>{customer.fieldData.CustomerName}</div>
					</Link>
				)}
			</div>
		);
	}
}

// body: JSON.stringify({
// 	"accountName": localStorage.getItem('accountName'),
// 	"accountPassword": localStorage.getItem('accountName'),
// })
export default App;
