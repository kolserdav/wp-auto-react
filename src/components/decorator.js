import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import getLocale from '../getLocale.js';
import styles from '../styles.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Components
import WpNavbar from './navbar.js';
import WpPost from './post.js';
import WpMenu from './menu.js';
import WpHome from './home.js';
import WpPage from './page.js';

export default class WpDecorator extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.lang = getLocale();
	}


	render() {
		let classes = {list: 'list', menuHeader: 'menu-'}
		return (
			<Router>
				<WpNavbar>
					<WpMenu />
					<Typography>
						<Link className={styles.navbar_link} to='/home/list:1'>{ this.lang.HOME.toUpperCase() }</Link>
					</Typography>
				</WpNavbar>
				<Grid className={styles.grid_container} container spaces={8}>
					<Grid className={styles.subHeader} item xs={12} sm={3}>
						dasd
					</Grid>
					<Grid item xs={12} sm={6}>
						<Route path='/home' component={WpHome} />
						<Route path='/post:id' component={WpPost} />
						<Route path='/page:id' component={WpPage} />
					</Grid>
					<Grid item sm={3}></Grid>
				</Grid>
			</Router>
		);
	}
}
