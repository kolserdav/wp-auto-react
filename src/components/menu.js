import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.css';
import { analyzeUrl } from '../helper.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import getLocale from '../getLocale.js';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
		this.id = analyzeUrl('page:');
		const OptionsElement = (data) => {
			let selected = (!this.id);
			return (
				<div>
					<MenuItem selected={selected} onClick={this.handleClose} key={'close-button'}><CloseIcon /></MenuItem>
				{
					data.titles.map((item, index, array) => {
						if (item.parent === null && item.children.length === 0) {
							selected = (item.id === this.id);
							return (
								<Link key={`menu-item-${item.id}`} className={styles.link} to={`/page:${item.id}`}>
									<MenuItem selected={selected}>
										<Typography className={styles.itemMenu}>{ item.title }</Typography>
									</MenuItem>
								</Link>
							);
						}
						else if (item.parent === null && item.children.length > 0) {
							this.children = (!this.children)? {} : this.children;
							this.children[item.id] = item.children.map(item1 => {
								const i = data.indexes[item1];
								const secondLevelTitle = `|____${data.titles[i].title}`;
								if (data.titles[i].children.length === 0){
									selected = (item1 === this.id);
									return (
										<Link to={`/page:${item1}`} className={styles.link} key={`item-menu-${item1}`}>
											<MenuItem selected={selected}>
												<Typography className={styles.itemMenu}>{ secondLevelTitle }</Typography>
											</MenuItem>
										</Link>
									);
								}
								else {
									this.subChildren = (!this.subChildren)? {} : this.subChildren;
									this.subChildren[item1] =  data.titles[i].children.map(item2 => {
										const ii = data.indexes[item2];
										selected = (item2 === this.id);
										return (
											<Link key={`menu-item-${item2}`} className={styles.link} to={`/page:${item2}`}>
												<MenuItem selected={selected} onClick={this.handleSpoyler(item2)}>
													<Typography className={styles.itemMenu}>{ '|____|____'}{data.titles[ii].title }</Typography>
												</MenuItem>
											</Link>
										);
									});
									selected = (item1 === this.id);
									return (
										<div key={`menu-item-${item1}`}>
											<Link to={`/page:${item1}`} className={styles.link}>
												<MenuItem selected={selected} onClick={this.handleSpoyler(item1)}>
													<Typography className={styles.itemMenu}>{ secondLevelTitle }</Typography>
													{this.state[item1]? <ExpandLessIcon /> : <ExpandMoreIcon />}
												</MenuItem>
											</Link>
											{this.state[item1]? this.subChildren[item1] : <div></div>}
										</div>
									);
								}
							});
							selected = (item.id === this.id);
							return (
								<div key={`menu-item-${item.id}`}>
									<Link className={styles.link} to={`/page:${item.id}`}>
										<MenuItem selected={selected} onClick={this.handleSpoyler(item.id)}>
											<Typography className={styles.itemMenu}>{item.title}</Typography>
										{this.state[item.id]? <ExpandLessIcon /> : <ExpandMoreIcon />}
										</MenuItem>
									</Link>
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
					<WpApi
						get={'PAGES_LIST'}
						element={OptionsElement}
					/>
						})
					}
				</Menu>
			</div>
		);
	}
}
