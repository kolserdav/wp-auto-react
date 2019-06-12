import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../styles.css';
import getLocale from '../getLocale.js';
const env = require('../conf/env.json');

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
const homePost = 'HOME_POST';
const development = 'development';


export default class WpApi extends Component {
	constructor(props) {
		super(props);
		this.level = (env.devel)? 1 : 3;
		this.state = {
			element: false
		};
		this.mode = development;
		this.props = props;
		this.pathPrefix = '';
		this.dataDirName = 'storage';
		this.includeData(this.level);
	}

  static propTypes = {
    text: PropTypes.string
  }

	setElement(element) {
		this.element = element;
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
			result = require(`../../../storage/${name}.json`)
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
				this.setElement({
					name: allLists,
					posts: this.dataPosts,
					pages: this.dataPages,
					categories: this.dataCategories
				});
				break;
			case postsList:
				this.setElement(this.dataPosts);
				break;
			case pagesList:
				this.setElement(this.dataPages);
				break;
			case categoriesList:
				this.setElement(this.dataCategories);
				break;
			case allPosts:
				const dataAllPosts = {
					name: this.get,
					items: this.getAllItems(this.dataPosts)
				};
				this.setElement(dataAllPosts);
				break;
			case allPages:
				const dataAllPages = {
					name: this.get,
					items: this.getAllItems(this.dataPages)
				};
				this.setElement(dataAllPages);
				break;
			case allCategories:
				const dataAllCategories = {
					name: this.get,
					items: this.getAllItems(this.dataCategories)
				};
				this.setElement(dataAllCategories);
				break;
			case postsForId:
				const dataPostsForId = {
					name: this.get,
					items: this.getAllItems(this.props)
				};
				this.setElement(dataPostsForId);
				break;
			case pagesForId:
				const dataPagesForId = {
					name: this.get,
					items: this.getAllItems(this.props)
				};
				this.setElement(dataPagesForId);
				break;
			case homePost:
				let dataHomePost;
				switch(this.level) {
					case 1: 
						try {
							// eslint-disable-next-line
							dataHomePost = require(`../storage/posts/post_home.json`);
						}
						catch(e) {}
						break;
					case 3:
						try {
							// eslint-disable-next-line
							dataHomePost = require(`../../../storage/posts/post_home.json`);
						}
						catch(e) {}
						break;
					default:
						break;
				}
				dataHomePost = {
					name: this.get,
					items: [dataHomePost]
				};
				this.setElement(dataHomePost);
				break;
			default:
				const error = new Error(`Property get={'${this.get}'} is not accepted`);
				console.error(error.stack);
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
				console.error(`Case ${i} not accepted in to 'includeData'`)
				break;
		}
	}		

  render() {
		this.getRequest(this.level);
    return (
      <div className={this.props.className}>
				{this.props.element(this.element, this.dangerousHTML)}
      </div>
    )
  }
}
