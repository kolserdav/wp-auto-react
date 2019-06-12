import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.css';
import { analyzeUrl } from '../helper.js';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

// Components
import WpApi from './api.js';
import WpOptions from './options.js';


export default class WpMenu extends Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			open: false,
			anchorEl: null
		};
	}

	handleClose = () => {
   this.setState({ anchorEl: null });
  };

	handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

	render() {
		const open = Boolean(this.state.anchorEl)
		return (
			<div>
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : undefined}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MenuIcon />
				</IconButton>
				<Menu
					disableAutoFocusItem={false}
					autoFocus={false}
					id="long-menu"
					anchorEl={this.state.anchorEl}
					open={open}
					variant="selectedMenu"
					onClose={this.handleClose}
					PaperProps={{
						style: {
							minWidth: 200,
						},
					}}
				>
					<WpOptions />
				</Menu>
			</div>
		);
	}
}
