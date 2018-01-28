import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import '../css/Header.css';

import AddEditCustomer from './AddEditCustomer';

class Header extends Component {
	state = {
		openDialog: false,
	}


	onOpenAddCustomer(e) {
		e.preventDefault();
		this.setState({ openDialog: true });
	}

	onSignOut(e) {
		e.preventDefault();

		fetch('/logout').then(this.props.goLogin());

	}

	onCancel() {
		this.setState({
			openDialog: false,
		});
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

	render() {
		let currPage = this.props.page;

		return (
			<MuiThemeProvider>
				<div>
					<div className="Header">
						<h3>{this.props.name}</h3>
						<div>
							{(currPage === 1) ?
								<button className="menu-links" onClick={this.onOpenAddCustomer.bind(this)}>Add Customer</button> :
								<button className="menu-links" onClick={this.onOpenAddCustomer.bind(this)}>Edit Customer</button>
							}
							<button className="menu-pipe">|</button>
							<button className="menu-links" onClick={this.onSignOut.bind(this)}>Sign Out</button>
						</div>
					</div>
					<AddEditCustomer
						onCancel={this.onCancel.bind(this)}
						openDialog={this.state.openDialog}
						newCustomerAdded={() =>this.props.newCustomerAdded()}
						info={this.props.info}
						onCustomerUpdated={this.props.onCustomerUpdated()} />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Header;
