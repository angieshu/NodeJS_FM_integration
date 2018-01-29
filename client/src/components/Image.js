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
		let category = this.props.category;
		let assets = this.props.assets.filter(asses => asses.fieldData.Category === category);
		return (
			<MuiThemeProvider>
				{(assets.length === 0) ? "" :
					<div>
						<br />
						<p className="assetCategory">{category}</p>
						<br />
						<div className="assetsRoot">
							<GridList cellHeight={140} style={styles.gridList} cols={4}>
								{ assets.map(asset =>
									<GridTile
									key={asset.recordId}
									title={asset.fieldData.SubCategory}
									subtitle={asset.fieldData.Notes}>
										<img src={asset.fieldData.Media} alt=""/>
									</GridTile>
								)}
							</GridList>
						</div>
					</div>
				}
				<br /><br /><br />
			</MuiThemeProvider>
		);
	}
}

export default Image;
