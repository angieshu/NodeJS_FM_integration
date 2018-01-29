import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';

import '../css/Image.css';

const styles = {
  gridList: {
    width: `100%`,
    height: `100%`,
    overflowY: 'auto',
  },
};

class Image extends Component {
	render() {
		let assets = this.props.assets;
		let category = this.props.category;
		return (
			<MuiThemeProvider>
				<br />
				<p className="assetCategory">{category}</p>
				<br />
				<div className="assetsRoot">
					<GridList cellHeight={140} style={styles.gridList} cols={4}>
						{ assets.filter(asset => asset.fieldData.Category === category).map(asset =>
							<GridTile
							key={asset.recordId}
							title={asset.fieldData.SubCategory}
							subtitle={asset.fieldData.Notes}>
								<img src={asset.fieldData.Media} alt=""/>
							</GridTile>
						)}
					</GridList>
				</div>
				<br /><br /><br />
			</MuiThemeProvider>
		);
	}
}

export default Image;
