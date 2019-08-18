import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styles from '../styles.css';
import { withRouter, Link } from 'react-router-dom'

//Components
import WpApi from './api.js';

class WpBreadcrumbs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 'recents'
		};
		this.elements = [];
	}

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
		this.props.history.push(newValue);
  }

	getElement(added, value) {
		return (
       <BottomNavigationAction key={added} label={value} value={added} showLabel={true} />
		);
	}

	render() {
		const classes = styles;
		let value = this.state.value;
		const added = this.props.location.pathname;
		const newAd = added.replace(/[\/:\d+]/g, '');
		let id = added.match(/\d+/);
		id = id[0];
		let get;
		switch(newAd) {
			case 'category':
				get = 'CATEGORIES_LIST';
				break;
			case 'post':
				get = 'POSTS_LIST';
				break;
			case 'page':
				get = 'PAGES_LIST';
				break;
			default:
				get = 'POSTS_LIST';
				break;
		}
		const elementApi = (data, html) => {
			if (data.titles) {
				data.titles.map(item => {
					if (item.id === parseInt(id)) {
						const element = this.getElement(added, item.title);
						this._pathFound = false;
						this.elements.map(itemEl => {
							if (itemEl.key === added) {
								this._pathFound = true;
							}
						});
						if (!this._pathFound) {
							value = added;
							this.elements.push(element);
						}
						if (this.elements.length > 6) {
							this.elements.shift();
						}
					}
				})
				return (
					<BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
						{ this.elements }
					</BottomNavigation>
				);
			};
		}
		return (
			<div>
				<WpApi
					get={get}
					element={elementApi}
				/>
			</div>
		);
	}
}

export default withRouter(WpBreadcrumbs);
