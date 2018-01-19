import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import '../css/App.css';

import Header from './Header';

import rightArrow from '../img/right-arrow.png';
import menu from '../img/menu.png';

class App extends Component {
	state = {
		customers: [],
		openPopover: false
	}

	componentWillMount() {
		document.body.style.backgroundColor = `#E0E0E0`;
	}

	componentDidMount() {
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

	handlePopoverOpen(e) {
		e.preventDefault();
		this.setState({
			openPopover: true,
			anchorEl: e.currentTarget,
		});
	}

	handlePopoverClose() {
		this.setState({
			openPopover: false
		})
	}

	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Header name="Customers" page={1} />
					<div className="customers-body">
						{this.state.customers.map(customer =>
							<Link key={customer.recordId} to={{ pathname: `/customers/${customer.recordId}` }}>
								<button key={customer.recordId} className="customer">
									{customer.fieldData.CustomerName}
									<img src={rightArrow} />
								</button>
								<br /><br />
							</Link>
						)}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
