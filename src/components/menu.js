import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import getLocale from '../getLocale.js';
import IconButton from '@material-ui/core/IconButton';

// Components
import WpApi from './api.js';


export default class WpMenu extends Component {

	constructor(props) {
		super(props);
		this.lang = getLocale();
		this.props = props;
		this.state = {
			anchorEl: null,
			open: false
		};
		this.options = [
			this.firstCapitalize(this.lang.CATEGORIES),
			this.firstCapitalize(this.lang.POSTS),
			this.firstCapitalize(this.lang.PAGES)
		];
		this.itemHeight = 48;
	}

	firstCapitalize(word) {
		let wordWrite = '';
		for (let i = 0; i < word.length; i ++) {
			let symbol = (i === 0)? word[i].toUpperCase() : word[i];
			wordWrite += symbol;
		}
		return wordWrite;
	}

	handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

	handleClose = () => {
    this.setState({ anchorEl: null });
  };

	render() {
		const optionsElement = (data, html) => {
			console.log(data)
			return (
				<div>
				{this.options.map(option => (
					<MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
						{option}
					</MenuItem>
				))}
				</div>
			);
		}
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
					id="long-menu"
					anchorEl={this.state.anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							maxHeight: this.itemHeight * 4.5,
							width: 200,
						},
					}}
				>
					<WpApi 
						get={'PAGES_LIST'}
						element={optionsElement}
					/>
				</Menu>
			</div>
		);
	}
}
