import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Media extends Component {
	state = { media: [] }

	componentDidMount() {
		// console.log(encodeURI(`/customers${this.props.match.url}`));
		// fetch(encodeURI(`${this.props.match.url}`))
		fetch(encodeURI(`${this.props.path}`))
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					this.props.history.push('/login');
				} else {
					this.setState({ media: res.data });
				}
			});
			// .then(media => this.setState({ media }));
	}

	render() {
		console.log(this.state.media);
		return (
			<div>
			{this.state.media.map(asset =>
				<div key={asset.recordId}>
					{asset.fieldData.SubCategory}
					<br />
					<img src={asset.fieldData.Media} alt=""/>
					<br />
				</div>
			)}
			</div>
		);
	}
}

export default Media;
