import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.css';
import { analyzeUrl } from '../helper.js';
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

export default class WpOptions extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.lang = getLocale();
		this.state = {
			anchorEl: null,
			open: false
		};
		this.itemHeight = 48;
	}

	handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

	handleSpoyler = (item) => {
		return () => {
			this.setState(prevState => (
				{[item]: !prevState[item]}
			))
		}
	};

	handleClickItem = () => {
		this.id = analyzeUrl('page:');
	}

	render() {
		const OptionsElement = (data) => {
			this.handleClickItem();
			let selected = (!(this.id === -1))
			return (
				<div>
					<MenuItem selected={selected} key={'close-button'}><Typography variant="subtitle2">{ this.lang.MENU_HEADER }</Typography></MenuItem>
				{
					// First level items
					data.titles.map((item, index, array) => {
						// No parent childlength 0
						if (item.parent === null && item.children.length === 0) {
							selected = (item.id === this.id);
							return (
								<Link key={`menu-item-${item.id}`} onClick={this.handleClickItem} className={styles.link} to={`/page:${item.id}`}>
									<MenuItem selected={selected}>
										<Typography className={styles.itemMenu}>{ item.title }</Typography>
									</MenuItem>
								</Link>
							);
						}
						// No parend childlength > 0
						else if (item.parent === null && item.children.length > 0) {
							this.children = (!this.children)? {} : this.children;
							this.children[item.id] = item.children.map(item1 => {
								const i = data.indexes[item1];
								const secondLevelTitle = `|____${data.titles[i].title}`;
								if (data.titles[i].children.length === 0){
									selected = (item1 === this.id);
									return (
										<Link to={`/page:${item1}`} className={styles.link} key={`item-menu-${item1}`} onClick={this.handleClickItem}>
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
											<Link key={`menu-item-${item2}`} className={styles.link} to={`/page:${item2}`} onClick={this.handleClickItem}>
												<MenuItem selected={selected} onClick={this.handleSpoyler(item2)}>
													<Typography className={styles.itemMenu}>{ '|____|____'}{data.titles[ii].title }</Typography>
												</MenuItem>
											</Link>
										);
									});
									selected = (item1 === this.id);
									return (
										<div key={`menu-item-${item1}`}>
											<Link to={`/page:${item1}`} className={styles.link} onClick={this.handleClickItem}>
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
									<Link className={styles.link} to={`/page:${item.id}`} onClick={this.handleClickItem}>
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
		return (
			<div>
				<WpApi
					get={'PAGES_LIST'}
					element={OptionsElement}
				/>
			</div>
		);
	}
}
