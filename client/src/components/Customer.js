import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Customer extends Component {
	state = { info: [] }

	componentDidMount() {
		console.log('here', encodeURI(`${this.props.match.url}`));
		fetch(encodeURI(`${this.props.match.url}`))
			.then(res => res.json())
			.then(res => res.data)
			.then(info => this.setState({ info }));
	}

	render() {
		if (Object.keys(this.state.info).length !== 0)
			console.log(`${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}`);
		return (
			<div>
				{ (Object.keys(this.state.info).length === 0) ?
					(<h1>No info.</h1>) : (
					<div>
						<h1>{ this.state.info[0].fieldData.CustomerName }</h1>
						<h4>Division:</h4>
						{ this.state.info[0].fieldData.Division }
						<h4>Roles:</h4>
						{ this.state.info[0].fieldData.RolesDisplay }
						<br />
						<Link to={{ pathname: `${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}` }}>
							<button>See Media</button>
						</Link>
					</div>
				)}
			</div>
		);
	}
}

export default Customer;
