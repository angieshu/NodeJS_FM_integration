import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import '../css/Header.css';

import menu from '../img/menu.png';

class Header extends Component {
	state = {
		openAddCustomer: false,
		step: 1,
		roles: [],
	}

	constructor() {
		super();
		this.newCustomer = {}
	}

	onOpenAddCustomer(e) {
		e.preventDefault();
		this.setState({ openAddCustomer: true });
	}

	onSignOut(e) {
		e.preventDefault();

	}

	onCancel() {
		this.setState({
			openAddCustomer: false,
			step: 1
		});
	}

	onSubmitAddCust() {
		if (this.state.step === 1 && (document.getElementById('newCustName').value === "" || document.getElementById('newCustDiv').value === "")) {
			alert("Please fill out all fields!");
			return ;
		} else if (this.state.step === 1) {
			this.newCustomer.name = document.getElementById('newCustName').value;
			this.newCustomer.division = document.getElementById('newCustDiv').value;
			this.setState({ step: 2 });
		} else if (this.state.step === 2 && this.state.roles.length === 0) {
			alert("Please add roles!");
			return ;
		} else if (this.state.step === 2) {
			fetch(encodeURI(`/addCustomer/${this.newCustomer.name}/${this.newCustomer.division}`))
				.then(res => res.json())
				.then(res => {
					// console.log(res);
					this.state.roles.map(role => fetch(`/addRole/${res.recordId}/${role}`)
													.then(res => res.json())
													.then(res => { console.log(res); }))
					this.onCancel();
					this.props.newCustomerAdded();
				})
		}

	}

	onAddRole(e) {
		e.preventDefault();

		if (document.getElementById('newRole').value !== "") {
			let roles = this.state.roles;
			roles.unshift(document.getElementById('newRole').value);
			this.setState({ roles });
			document.getElementById('newRole').value = "";
		}
	}

	render() {
		let currPage = this.props.page;
		let actions = [
			<button onClick={this.onCancel.bind(this)}>Cancel</button>,
			<button onClick={this.onSubmitAddCust.bind(this)}>Submit</button>
		];

		return (
			<MuiThemeProvider>
				<div className="Header">
					<h3>{this.props.name}</h3>
					<div>
						<button className="menu-links" onClick={this.onOpenAddCustomer.bind(this)}>Add Customer</button>
						<button className="menu-pipe">|</button>
						<button className="menu-links" onClick={this.onSignOut.bind(this)}>Sign Out</button>
					</div>
					<Dialog
						title="Add Customer"
						modal={true}
						open={this.state.openAddCustomer}
						autoScrollBodyContent={true}
						actions={actions}
						contentStyle={{width: `30em`, height: `50em`}}
					>
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
								/>
								<br /><br />
								<TextField
								id="newCustDiv"
								hintText="Customer Division"
								floatingLabelText="Customer Division *"
								inputStyle={{ color: `#383838` }}
								underlineStyle={{ borderColor: `#383838` }}
								underlineFocusStyle={{ display: `none` }}
								floatingLabelStyle={{ color: `#383838` }} />
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
										<div>{role}</div>
									)}
								</div>}
					</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Header;
