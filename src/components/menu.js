import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import getLocale from '../getLocale.js';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

	handleSpoyler = (item) => {
		return () => {
			this.setState(prevState => (
				{[item]: !prevState[item]}
			))
		}
	};

	getData() {
		let data;
		try {
			// eslint-disable-next-line
			data = require('../../../storage/pages.json');
		}
		catch(e) {}
		if (data === undefined) {
			try {
				// eslint-disable-next-line
				data = require('../storage/pages.json');
			}
			catch(e) {}
		}
		return data;
	}

	render() {
		const OptionsElement = () => {
			const data = this.getData();
			return (
				<div>
				{
					data.titles.map((item, index, array) => {
						if (item.parent === null && item.children.length === 0) {
							return (
								<MenuItem key={item.id}>
									<Link to={`/page:${item.id}`}>{item.title}</Link>
								</MenuItem>
							);
						}
						else if (item.parent === null && item.children.length > 0) {
							this.children = (!this.children)? {} : this.children;
							this.children[item.id] = item.children.map(item1 => {
								const i = data.indexes[item1];
								const secondLevelTitle = `|____${data.titles[i].title}`;
								if (data.titles[i].children.length === 0){
									return (
										<MenuItem key={item1}>
										{ secondLevelTitle }
										</MenuItem>
									);
								}
								else {
									this.subChildren = (!this.subChildren)? {} : this.subChildren;
									this.subChildren[item1] =  data.titles[i].children.map(item2 => {
										const ii = data.indexes[item2];
										return (
											<MenuItem key={item2} onClick={this.handleSpoyler(item2)}>
											{'|____|____'}{data.titles[ii].title}
											</MenuItem>
										);
									});
									return (
										<div key={`d-${item1}`}>
											<MenuItem key={item1} onClick={this.handleSpoyler(item1)}>
												{ secondLevelTitle }
												{this.state[item1]? <ExpandLessIcon /> : <ExpandMoreIcon />}
											</MenuItem>
											{this.state[item1]? this.subChildren[item1] : <div></div>}
										</div>
									);
								}
							});
							return (
								<div key={`d-${item.id}`}>
									<MenuItem key={item.id} onClick={this.handleSpoyler(item.id)}>
										{item.title}
									{this.state[item.id]? <ExpandLessIcon /> : <ExpandMoreIcon />}
									</MenuItem>
									{this.state[item.id]? this.children[item.id] : <div></div>}
								</div>
							);
						}
					})
				}
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
							minWidth: 200,
						},
					}}
				>
					<OptionsElement />
						})
					}
				</Menu>
			</div>
		);
	}
}
