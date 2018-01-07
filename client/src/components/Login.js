import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ls from 'localStorage';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../css/Login.css';

class Login extends Component {
	state = { error: false }

	handleSignIn() {
		fetch('/auth', {
			method: "post",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"accountName": document.getElementById('accountName').value,
				"accountPassword": document.getElementById('accountPassword').value,
			})
		}).then(res => res.json())
		  .then(res => {
			if (res.error) {
				this.setState({ error: true });
			} else {
				this.setState({ error: false });
				document.getElementById('accountName').value = "";
				document.getElementById('accountPassword').value = "";
				this.props.history.push('/');
			}
		});
		// let user = {
		// 	user: document.getElementById('accountName').value,
		// 	password: document.getElementById('accountPassword').value
		// }
		// ls.setItem('user', JSON.stringify(user));
		// console.log('in login');
		// this.props.history.push('/');
		// localStorage.setItem('accountName', document.getElementById('accountName').value);
	}

	render() {
		return (
			<MuiThemeProvider>
				<div className="Login">
						<div className="login-form">
						{ (this.state.error) ?
							(
								<div>
									<TextField
										id="accountName"
										hintText="Account Name"
										floatingLabelText="Account Name"
										inputStyle={{ color: `#383838` }}
										underlineStyle={{ borderColor: `red` }}
										underlineFocusStyle={{ display: `none` }}
										floatingLabelStyle={{ color: `red` }}
									 	/>
									<br /><br />
									<TextField
										id="accountPassword"
										hintText="Password"
										floatingLabelText="Password"
										type="password"
										inputStyle={{ color: `#383838` }}
										underlineStyle={{ borderColor: `red` }}
										underlineFocusStyle={{ display: `none` }}
										floatingLabelStyle={{ color: `red` }} />
										<br /><br />
										<p className="error-msg">Please enter valid account name and password.</p>
										<button className="btn-onerror" onClick={this.handleSignIn.bind(this)}>Sign In</button>
								</div>
							) : (
								<div>
									<TextField
									id="accountName"
									hintText="Account Name"
									floatingLabelText="Account Name"
									inputStyle={{ color: `#383838` }}
									underlineStyle={{ borderColor: `#383838` }}
									underlineFocusStyle={{ display: `none` }}
									floatingLabelStyle={{ color: `#383838` }}
									/>
									<br /><br />
									<TextField
									id="accountPassword"
									hintText="Password"
									floatingLabelText="Password"
									type="password"
									inputStyle={{ color: `#383838` }}
									underlineStyle={{ borderColor: `#383838` }}
									underlineFocusStyle={{ display: `none` }}
									floatingLabelStyle={{ color: `#383838` }} />
									<br /><br />
									<button className="btn" onClick={this.handleSignIn.bind(this)}>Sign In</button>
								</div>
							)
						}
						</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Login;
