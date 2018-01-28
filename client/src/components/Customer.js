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
		this.getData();
	}

	getData() {
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

	// noData() {
	// 	this.props.history.push('/login');
	// }

	render() {
		if (Object.keys(this.state.info).length !== 0)
			console.log(`${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}`);
		return (
			<div className="Customer">
				{ (Object.keys(this.state.info).length === 0) ?
					("") : (
					<div>
						<Header
							name={this.state.info[0].fieldData.CustomerName}
							page={2}
							goLogin={() => this.props.history.push('/login')}
							info={this.state.info[0]}
							onCustomerUpdated={() => this.getData.bind(this)} />
						<div className="customer-body">
							<p className="customer-info">Info</p>
							<p className="customer-label">Name</p>
							<p className="customer-descr">{ this.state.info[0].fieldData.CustomerName }</p>
							<br />
							<p className="customer-label">Division</p>
							<p className="customer-descr">{ this.state.info[0].fieldData.Division }</p>
							<br />
							<p className="customer-label">Roles</p>
							<p className="customer-descr">{ this.state.info[0].fieldData.RolesDisplay }</p>
							<br />
							<br />
							<Media path={`${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}`} />
						</div>
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
