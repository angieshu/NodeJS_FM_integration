import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/Customer.css';

import Media from './Media';
import Header from './Header';

class Customer extends Component {
	state = { info: [] }

	componentWillMount() {
		document.body.style.backgroundColor = `#E0E0E0`;
	}

	componentDidMount() {
		fetch(encodeURI(`${this.props.match.url}`))
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					this.props.history.push('/login');
				} else {
					this.setState({ info: res.data });
				}
			});
	}

	render() {
		if (Object.keys(this.state.info).length !== 0)
			console.log(`${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}`);
		return (
			<div className="Customer">
				{ (Object.keys(this.state.info).length === 0) ?
					("") : (
					<div>
						<Header name={this.state.info[0].fieldData.CustomerName} page={1} />
						<h4>Division:</h4>
						{ this.state.info[0].fieldData.Division }
						<h4>Roles:</h4>
						{ this.state.info[0].fieldData.RolesDisplay }
						<br />
						<Media path={`${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}`} />
					</div>
				)}
			</div>
		);
	}
}

// <Link to={{ pathname: `${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}` }}>
// <button>See Media</button>
// </Link>
export default Customer;
