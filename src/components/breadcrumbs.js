import React from 'react';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styles from '../styles.css';


export default class WpBreadcrumbs extends React.Component {
	
	constructor(props) {
		super(props);
	}

	handleClick = (event) => {
		event.preventDefault();
		alert('You clicked a breadcrumb.');
	}

  render() {
		const classes = styles;
		return (
			<div className={classes.root}>
				<Paper elevation={0} className={classes.paper}>
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Link color="inherit" href="/" onClick={this.handleClick}>
							Material-UI
						</Link>
						<Link color="inherit" href="/getting-started/installation/" onClick={this.handleClick}>
							Core
						</Link>
						<Typography color="textPrimary">Breadcrumb</Typography>
					</Breadcrumbs>
				</Paper>
				<br />
				<Paper elevation={0} className={classes.paper}>
					<Breadcrumbs separator="-" aria-label="breadcrumb">
						<Link color="inherit" href="/" onClick={this.handleClick}>
							Material-UI
						</Link>
						<Link color="inherit" href="/getting-started/installation/" onClick={this.handleClick}>
							Core
						</Link>
						<Typography color="textPrimary">Breadcrumb</Typography>
					</Breadcrumbs>
				</Paper>
				<br />
				<Paper elevation={0} className={classes.paper}>
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<Link color="inherit" href="/" onClick={this.handleClick}>
							Material-UI
						</Link>
						<Link color="inherit" href="/getting-started/installation/" onClick={this.handleClick}>
							Core
						</Link>
						<Typography color="textPrimary">Breadcrumb</Typography>
					</Breadcrumbs>
				</Paper>
			</div>
		);
	}
}
