import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../styles.css';	
import getLocale from '../getLocale.js';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//Expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default class WpCategoriesMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			anchorEl: null,
			options: [],
			elements: {}
		}
		this.props = props;
		this.lang = getLocale();
	}

	getPrefix(level) {
		const prefix = (level === 1)? '' : '-';
		this.prefix = '';
		for (let i = 1; i < level; i ++) {
			this.prefix = this.prefix + prefix;
		}
		return this.prefix;
	}

	getElement(key, title, children, level) {
		const obj = this.state.elements;
		const prefix = this.getPrefix(level);
		let icon;
		if (obj[key] === undefined) {
			obj[key] = (prefix === '');
			icon = (children)? <ExpandMoreIcon /> : '';
			this.setState({elements: obj});
		}
		else {
			if (!children) {
				icon = '';
			}
			else {
				const child = this.categoriesElement[level][key].children;
				icon = (obj[child[0]])? <ExpandLessIcon /> :  <ExpandMoreIcon />;
			}
		}
		return (
			<div key={`${key}${level}`}>
				{this.state.elements[key]?
					this.getElementWithIcon(prefix, icon, title, key, level)
					: ''
				}
			</div>
		);
	}

	getElementWithIcon(prefix, icon, title, key, level) {
		return (
			<Link
				to={`/category:${key}`}
				className={styles.link}
			>
				<MenuItem 
					style={{"overflowX": "auto"}}
					onClick={(e) => {
						const children = this.categoriesElement[level][key].children;
						children.map(item => {
							const obj = this.state.elements;
							obj[item] = !obj[item];
							this.setState({elements: obj});
						});
						this.setOptionData();
					}}
				>
					{ prefix }
						<Typography variant="body1">{ title }</Typography>
					{ icon }
				</MenuItem>
			</ Link>
		);
	}

	fillElements() {
		this.categories = this.props.elements.categories;
		this.levels = {};
		this.categories.map(itemCategories => {
			this.levels[itemCategories.level] =  (!this.levels[itemCategories.level])? [] : this.levels[itemCategories.level];
			this.levels[itemCategories.level].push(itemCategories);
		});
		let i = 1;
		const categoriesElement = {};
		const resElement = [];
		while (this.levels[i]) {
			this.levels[i].map(itemLevel => {
				categoriesElement[i] = (categoriesElement[i])? categoriesElement[i] : {};
				categoriesElement[i][itemLevel.id] = (categoriesElement[i][itemLevel.id])? (categoriesElement[i][itemLevel.id]) : {};
				const childFound = (itemLevel.children.length > 0);
				categoriesElement[i][itemLevel.id].element = this.getElement(itemLevel.id, itemLevel.title, childFound, i);
				categoriesElement[i][itemLevel.id].parent = itemLevel.parent;
				categoriesElement[i][itemLevel.id].children = itemLevel.children;
			});
			i ++;
		}
		i = 1;
		this.categoriesElement = categoriesElement;
		while (this.levels[i]) {
			this.levels[i].map(itemLevel => {
				if (this.categoriesElement[i][itemLevel.id].parent === null) {
					resElement.push(this.categoriesElement[i][itemLevel.id].element);
					const children = this.categoriesElement[i][itemLevel.id].children;
					if (children.length > 0) {
						this.children = [];
						const childElements = this.getChildElements(i + 1, children);
						resElement.push(childElements);
					}
				}
			});
			i ++;
		}
		return resElement;
	}

	setOptionData() {
		const resElement = this.fillElements();
    this.setState({options: resElement});
	}

	componentDidMount() {
		this.setOptionData();
	}

	getChildElements(level, children) {
		children.map(item => {
			this.children.push(this.categoriesElement[level][item].element);
			const subChildren = this.categoriesElement[level][item].children;
			if (subChildren.length > 0) {
				return this.getChildElements(level + 1, subChildren);
			}
		});
		return this.children;
	}

	handleClickPanel = () => {
		const elementCM = document.querySelector('#categories-menu');
		const panelHeader = document.querySelector('#categories-panel-header');
		const aria = panelHeader.getAttribute('aria-expanded');
		if (aria === 'true') {
		elementCM.setAttribute('style', "height: auto");
		}
		else {
		elementCM.setAttribute('style', "height: 90vh");
		}
	}

	render() {
		const expansionElement = (children) => (
			<div>
      <ExpansionPanel
				defaultExpanded={true}
			>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="categories-panel-content"
          id="categories-panel-header"
					onClick={this.handleClickPanel}
        >
          <Typography>{ this.lang.CATEGORIES_PANEL }</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
					{children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
		);
		return (
			<div 
				id="categories-menu"
				className={styles.categoriesMenu}
			>
				{ expansionElement(<MenuList
					className={styles.categoriesList}
					autoFocus={true}
					disableListWrap={true}
					style={{"overflow": "auto"}}
				>
					{this.state.options.map(option => (
						option
					)) }
				</MenuList>) }
			</div>
		);
	}
}
