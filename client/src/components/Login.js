import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fadeIn, pulse } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import '../css/Login.css';

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	},
	pulse: {
		animation: 'x 1s',
		animationName: Radium.keyframes(pulse, 'pulse')
	}
}

class Login extends Component {
	state = { error: false }

	componentWillMount() {
		 document.body.style.backgroundColor = `#009688`;
	}

	// componentDidMount() {
	// 	this.handleSignIn();
	// }

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
				// document.getElementById('accountName').value = "";
				// document.getElementById('accountPassword').value = "";
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<MuiThemeProvider>
				<div className="Login">
					<StyleRoot>
						<div style={styles.fadeIn}>
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
											<div style={styles.pulse}>
												<p className="error-msg">Please enter valid account name and password.</p>
											</div>
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
					</StyleRoot>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Login;
