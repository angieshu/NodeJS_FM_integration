import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import '../css/Header.css';

import menu from '../img/menu.png';

class Header extends Component {
	state = {
		openPopover: false
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
		let currPage = this.props.page;
		return (
			<MuiThemeProvider>
				<div className="Header">
					<h3>{this.props.name}</h3>
					<button className="menu-btn" onClick={this.handlePopoverOpen.bind(this)}>
						<img src={menu} />
					</button>
					<Popover
						open={this.state.openPopover}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'middle', vertical: 'top'}}
						onRequestClose={this.handlePopoverClose.bind(this)}
						animation={PopoverAnimationVertical}>
						<Menu>
							{ (currPage === 1) ? (<MenuItem primaryText="Add Customer" />) : ""}
							<MenuItem primaryText="Sign out" />
						</Menu>
					</Popover>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Header;
