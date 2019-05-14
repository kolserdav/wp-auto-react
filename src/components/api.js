import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../styles.css';
import getLocale from '../getLocale.js';

const allPages = 'ALL_PAGES';
const allPosts = 'ALL_POSTS';
const allCategories = 'ALL_CATEGORIES';
const pagesList = 'PAGES_LIST';
const postsList = 'POSTS_LIST';
const categoriesList = 'CATEGORIES_LIST';
const postsForId = 'POSTS_FOR_ID';
const pagesForId = 'PAGES_FOR_ID';
const categoriesForId = 'CATEGORIES_FOR_ID';
const allLists = 'ALL_LISTS';
const development = 'development';


export default class WpApi extends Component {
	constructor(props) {
		super(props);
		this.level = 1;
		this.state = {
			element: ''
		};
		this.mode = development;
		this.props = props;
		this.pathPrefix = '';
		this.dataDirName = 'storage';
		this.includeData();
	}

	componentDidMount() {
		this.getRequest(this.level);
	}

  static propTypes = {
    text: PropTypes.string
  }

	setElementToState(element) {
		this.setState({
			element: this.props.element(element, this.dangerousHTML)
		});
	}

	dangerousHTML (content) {
		return <a dangerouslySetInnerHTML={{__html: content}} />
	}

	firstLevelRequire(name) {
		let result;
		try {
			// eslint-disable-next-line
			result = require(`../storage/${name}.json`);
		}
		catch(e) {}
		return result;
	}

	threeLevelRequire(name) {
		let result;
		try {
			// eslint-disable-next-line
			result = require(`../../../storage/${name}.json`);
		}
		catch(e) {}
		return result;
	}

	getItemForId(id, name) {
		let item;
		switch(name) {
			case allPosts:
				if (this.level === 1){
					try {
						// eslint-disable-next-line
						item = require(`../storage/posts/post_${id}.json`);
					}
					catch(e) {}
				}
				else if (this.level === 3) {
					try {
						// eslint-disable-next-line
						item = require(`../../../storage/posts/post_${id}.json`);
					}
					catch (e) {}
				}
				break;
			case allPages:
				if (this.level === 1) {
					try {
						// eslint-disable-next-line
						item = require(`../storage/pages/page_${id}.json`);
					}
					catch (e) {}
				}
				else if (this.level === 3) {
					try {
						// eslint-disable-next-line
						item = require(`../../../storage/pages/page_${id}.json`);
					}
					catch (e) {}
				}
				break;
			case allCategories:
				if (this.level === 1) {
					try {
						// eslint-disable-next-line
						item = require(`../storage/categories/category_${id}.json`);
					}
					catch (e) {}
				}
				else if (this.level === 3) {
					try {
						// eslint-disable-next-line
						item = require(`../../../storage/categories/category_${id}.json`);
					}
					catch (e) {}
				}
				break;
			default:
				break;
		}
		return item;
	}

	getRequest() {
		this.get = this.props.get.toUpperCase();
		switch(this.get) {
			case allLists:
				this.setElementToState({
					name: allLists,
					posts: this.dataPosts,
					pages: this.dataPages,
					categories: this.dataCategories
				});
				break;
			case postsList:
				this.setElementToState(this.dataPosts);
				break;
			case pagesList:
				this.setElementToState(this.dataPages);
				break;
			case categoriesList:
				this.setElementToState(this.dataCategories);
				break;
			case allPosts:
				const dataAllPosts = {
					name: this.get,
					items: this.getAllItems(this.dataPosts)
				};
				this.setElementToState(dataAllPosts);
				break;
			case allPages:
				const dataAllPages = {
					name: this.get,
					items: this.getAllItems(this.dataPages)
				};
				this.setElementToState(dataAllPages);
				break;
			case allCategories:
				const dataAllCategories = {
					name: this.get,
					items: this.getAllItems(this.dataCategories)
				};
				this.setElementToState(dataAllCategories);
				break;
			case postsForId:
				const dataPostsForId = {
					name: this.get,
					items: this.getAllItems(this.props)
				};
				this.setElementToState(dataPostsForId);
				break;
			default:
				break;
		}
	}

	getAllItems(data) {
		const postsName = this.get.match(/POSTS/);
		const pagesName = this.get.match(/PAGES/);
		const categoriesName = this.get.match(/CATEGORIES/);
		let name;
		if (postsName) {
			name = allPosts;
		}
		else if (pagesName) {
			name = allPages;
		}
		else if (categoriesName) {
			name = allCategories;
		}
		return data.items.map(item => {
			return this.getItemForId(item, name);
		})
	}

	includeData(i = 1) {
		switch (i) {
			case 1:
				this.dataPosts = this.firstLevelRequire('posts');
				this.dataPages = this.firstLevelRequire('pages');
				this.dataCategories = this.firstLevelRequire('categories');
				break;
			case 3:
				this.dataPosts = this.threeLevelRequire('posts');
				this.dataPages = this.threeLevelRequire('pages');
				this.dataCategories = this.threeLevelRequire('categories');
				break;
			default:
				break;
		}
	}		

  render() {
    return (
      <div>
				{this.state.element}
      </div>
    )
  }
}
