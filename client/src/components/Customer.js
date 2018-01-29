import React, { Component } from 'react';

import '../css/Customer.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

import Media from './Media';
import Header from './Header';

class Customer extends Component {
	state = {
		info: [],
		openDialog: false
	}

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

	onCustomerUpdated() {
		this.getData();
	}

	onSubmitDeleteCust() {
		// console.log(this.state.info);
		fetch(`/roles/find/${this.state.info[0].fieldData.__pkCustomerID}`)
			.then(res => res.json())
			.then(res => res.data.map(role => fetch(`/removeRole/${role.recordId}`)))
			.then(() => fetch(`/deleteCustomer/${this.state.info[0].recordId}`)
				.then(() => this.props.history.push('/')));
		this.onCancel();
	}

	onCancel() {
		this.setState({ openDialog: false });
	}

	onDeleteCustomer(e) {
		e.preventDefault();

		this.setState({ openDialog: true })
	}

	render() {
		let actions = [
			<button onClick={this.onCancel.bind(this)}>Cancel</button>,
			<button onClick={this.onSubmitDeleteCust.bind(this)}>Submit</button>
		];

		return (
			<MuiThemeProvider>
				<div className="Customer">
					{ (Object.keys(this.state.info).length === 0) ?
						("") : (
						<div>
							<Header
								name={this.state.info[0].fieldData.CustomerName}
								page={2}
								goLogin={() => this.props.history.push('/login')}
								onCustomerUpdated={() => this.onCustomerUpdated.bind(this)}
								info={this.state.info[0]} />
							<div className="customer-body">
								<p className="customer-info">
									Info
									<button onClick={this.onDeleteCustomer.bind(this)}>Delete Customer</button>
								</p>
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
					{this.state.info.length === 0 ? "" :
						<Dialog
							modal={true}
							open={this.state.openDialog}
							autoScrollBodyContent={true}
							actions={actions}
							contentStyle={{width: `30em`, height: `50em`}}>
							<p>Are you sure you want to delete {this.state.info[0].fieldData.CustomerName}?</p>
						</Dialog>
					}
				</div>
			</MuiThemeProvider>
		);
	}
}

// <Link to={{ pathname: `${this.props.match.url}/media/${this.state.info[0].fieldData.__pkCustomerID}` }}>
// <button>See Media</button>
// </Link>
export default Customer;
