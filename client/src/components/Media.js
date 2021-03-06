import React, { Component } from 'react';

import '../css/Media.css';

import Image from './Image';

class Media extends Component {
	state = { media: [] }

	componentDidMount() {
		fetch(encodeURI(`${this.props.path}`))
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					console.log('NO DATA');
				} else {
					this.setState({ media: res.data });
				}
			});
	}

	render() {
		return (
			<div>
			<Image assets={this.state.media} category="Paper & Stationary"/>
			<Image assets={this.state.media} category="Checklist & Forms"/>
			<Image assets={this.state.media} category="Data Display"/>
			<Image assets={this.state.media} category="Notifications & Alerts"/>
			<Image assets={this.state.media} category="Data Entry"/>
			<Image assets={this.state.media} category="Navigation & Tracking"/>
			<Image assets={this.state.media} category="Scheduling & Scanning"/>
			<Image assets={this.state.media} category="Communication & Collaboration"/>
			<Image assets={this.state.media} category="Training & Evaluating"/>
			<Image assets={this.state.media} category="Health, Safety & Wellness"/>
			<Image assets={this.state.media} category="Surveillance & Monitoring"/>
			<br />
			</div>
		);
	}
}

export default Media;
