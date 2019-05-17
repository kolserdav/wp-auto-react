import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.css';
import Typography from '@material-ui/core/Typography';
import getLocale from '../getLocale.js';

// Components
import WpApi from './api.js';
import WpPost from './post.js';
import WpPostsList from  './postsList.js';


export default class WpHome extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;

	}


	render() {
		return (
			<div>
				<WpPost home={true} />
				<WpPostsList />
			</div>
		);
	}
}
