import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import getLocale from '../getLocale.js';
import styles from '../styles.css';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

// Components
import WpNavbar from './navbar.js';
import WpPost from './post.js';
import WpMenu from './menu.js';
import WpHome from './home.js';
import WpPage from './page.js';
import WpCategories from './categories.js';
import WpCategory from './category.js';
import WpBreadcrumbs from './breadcrumbs.js';
//import EnhancedTable from './footer.js';


export default class WpDecorator extends Component {
	
	constructor(props) {
		super(props);
		console.log(1)
		this.props = props;
		this.lang = getLocale();
	}


	render() {
		const normalise = value => (value - 10) * 100 / (1000 - 10);
		const Progress = (props) => {
			return (
				<React.Fragment>
					<CircularProgress variant="determinate" value={normalise(props.value)} />
				</React.Fragment>
			)
		}
		let classes = {list: 'list', menuHeader: 'menu-'}
		return (
			<Router>
				<WpNavbar>
					<WpMenu />
					<Typography>
						<Link className={styles.navbar_link} to='/home/list:1'>{ this.lang.HOME.toUpperCase() }</Link>
					</Typography>
				</WpNavbar>
				<WpBreadcrumbs />
				<Progress value={32}/>
				<Grid className={styles.grid_container} container spaces={8}>
					<Grid className={styles.subHeader} item xs={12} sm={3}>
						<WpCategories />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Route path='/home' component={WpHome} />
						<Route path='/post:id' component={WpPost} />
						<Route path='/page:id' component={WpPage} />
						<Route path='/category:id' component={WpCategory} />
					</Grid>
					<Grid item sm={3}></Grid>
				</Grid>
			{/* TODO <EnhancedTable />*/}
			</Router>
		);
	}
}
