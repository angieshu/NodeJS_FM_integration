import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddEditCustomer extends Component {
	state = {
		openAddCustomer: false,
		step: 1,
		roles: [],
		rolesFetched: []
	}

	constructor() {
		super();
		this.newCustomer = {};
		this.changes = {};
		this.rolesToDelete = [];
	}

	componentWillReceiveProps() {

		if (this.props.info !== undefined) {
			fetch(`/roles/find/${this.props.info.fieldData.__pkCustomerID}`)
				.then(res => res.json())
				.then(res => { this.setState({rolesFetched: res.data});});
		}
	}

	onCancel() {
		this.setState({
			openAddCustomer: false,
			step: 1,
			roles: []
		});
		this.props.onCancel();
	}

	onSubmitAddCust() {
		if (this.state.step === 1 && (document.getElementById('newCustName').value === "" || document.getElementById('newCustDiv').value === "")) {
			alert("Please fill out all fields!");
			return ;
		} else if (this.state.step === 1) {
			/** Check if customer exists **/
			this.newCustomer.name = document.getElementById('newCustName').value;
			this.newCustomer.division = document.getElementById('newCustDiv').value;
			if (this.props.info === undefined ||
				(this.props.info !== undefined && document.getElementById('newCustName').value !== this.props.info.fieldData.CustomerName)) {
				this.findCustomer(1);
			} else if (this.props.info !== undefined && document.getElementById('newCustName').value === this.props.info.fieldData.CustomerName) {
				this.setState({ step: 2 });
			}
		} else if ((this.state.step === 2 && this.state.roles.length === 0) ||
					(this.state.step === 2 && this.props.info !== undefined && this.state.rolesFetched === 0)) {
			alert("Please add roles!");
			return ;
		} else if (this.state.step === 2 && this.props.info === undefined) {
			this.addCustomer();
		} else if (this.state.step === 2) {
			this.editCustomer();
		}

	}

	onAddRole(e) {
		e.preventDefault();
		if (document.getElementById('newRole').value !== "") {
			let roles = this.state.roles;
			if (roles.filter(role => role === document.getElementById('newRole').value).length !== 0) {
				alert("Role has been already added!");
			} else {
				roles.unshift(document.getElementById('newRole').value);
				this.setState({ roles });
				document.getElementById('newRole').value = "";
			}
		}
	}

	/** fetchFlag: 1 - check, 2 - add roles, 3 - edit roles **/

	findCustomer(fetchFlag) {
		fetch(encodeURI(`/customers/find/${this.newCustomer.name}`))
			.then(res => res.json())
			.then(res => {
				if (!res.error && fetchFlag === 1) {
					alert('Customer with this name already exists. Please choose a different name!');
				} else if (res.error && fetchFlag === 1) {
					document.getElementById('newCustName').value = "";
					document.getElementById('newCustDiv').value = "";
					this.setState({ step: 2 });
				} else if (fetchFlag === 2) {
					this.addRoles(this.state.roles,res.data[0].fieldData.__pkCustomerID);
				}
			});
	}

	addRoles(rolesToAdd, customerId) {
		rolesToAdd.map(role => fetch(`/addRole/${customerId}/${role}`)
			.then(res => res.json()));
		this.onCancel();
		this.props.newCustomerAdded();
	}

	addCustomer() {
		fetch(encodeURI(`/addCustomer/${this.newCustomer.name}/${this.newCustomer.division}`))
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					alert('Unable to add a new customer. Please try again.');
				} else {

					/** Find out new customer's id and add roles one by one**/

					this.findCustomer(2);
				}
			});
	}

	editCustomer() {
		fetch(`/editCustomer/${this.props.info.recordId}/${this.newCustomer.name}/${this.newCustomer.division}`)
			.then(() => {
				this.onCancel();
				this.props.onCustomerUpdated();
			});
	}

	render() {
		let actions = [
			<button onClick={this.onCancel.bind(this)}>Cancel</button>,
			<button onClick={this.onSubmitAddCust.bind(this)}>Submit</button>
		];

		let name = "";
		let division = "";
		if (this.props.info !== undefined) {
			name = this.props.info.fieldData.CustomerName;
			division = this.props.info.fieldData.Division;
		}

		return (
			<MuiThemeProvider>
				<div>
					<Dialog
						title="Add Customer"
						modal={true}
						open={this.props.openDialog}
						autoScrollBodyContent={true}
						actions={actions}
						contentStyle={{width: `30em`, height: `50em`}}>
						{(this.state.step === 1) ?
							<div>
								<TextField
									id="newCustName"
									hintText="Customer Name"
									floatingLabelText="Customer Name *"
									inputStyle={{ color: `#383838` }}
									underlineStyle={{ borderColor: `#383838` }}
									underlineFocusStyle={{ display: `none` }}
									floatingLabelStyle={{ color: `#383838` }}
									defaultValue={name} />
								<br /><br />
								<TextField
									id="newCustDiv"
									hintText="Customer Division"
									floatingLabelText="Customer Division *"
									inputStyle={{ color: `#383838` }}
									underlineStyle={{ borderColor: `#383838` }}
									underlineFocusStyle={{ display: `none` }}
									floatingLabelStyle={{ color: `#383838` }}
									defaultValue={division} />
								</div> :
								<div>
									<div>
										<TextField
											id="newRole"
											hintText="New Role"
											floatingLabelText="New Role"
											inputStyle={{ color: `#383838` }}
											underlineStyle={{ borderColor: `#383838` }}
											underlineFocusStyle={{ display: `none` }}
											floatingLabelStyle={{ color: `#383838` }} />
										<button onClick={this.onAddRole.bind(this)}>Add Role</button>
									</div>
									{this.state.roles.map(role =>
										<div key={role}>{role}</div>
									)}
									{this.state.rolesFetched.map(role =>
										<div key={role}>{role.fieldData.Role}</div>
									)}
								</div>}
					</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default AddEditCustomer;
