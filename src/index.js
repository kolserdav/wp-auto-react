import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css';

const allPages = 'ALL_PAGES';
const allPosts = 'ALL_POSTS';
const allCategories = 'ALL_CATEGORIES';
const pagesList = 'PAGES_LIST';
const postsList = 'POSTS_LIST';
const categoriesList = 'CATEGORIES_LIST';
const postsForId = 'POSTS_FOR_ID';
const pagesForId = 'PAGES_FOR_ID';
const categoriesForId = 'CATEGORIES_FOR_ID';
const development = 'development';

export default class WprdpressApi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			element: ''
		};
		this.mode = development;
		this.props = props;
		this.pathPrefix = '';
		this.dataDirName = 'storage';
		this.includeData();
	}

  static propTypes = {
    text: PropTypes.string
  }

	setElemenentToState(element) {
		this.setState({
			element: this.props.element(element, this.dangerousHTML)
		});
	}

	dangerousHTML (content) {
		return <div dangerouslySetInnerHTML={{__html: content}} />
	}

	firstLevelRequire(name) {
		let result;
		try {
			result = require(`../storage/${name}.json`);
		}
		catch(e) {}
		return result;
	}

	getRequest() {
		this.get = this.props.get.toUpperCase();
		switch(this.get) {
			case postsList:
				this.setElemenentToState(this.dataPosts);
				break;
			case pagesList:
				this.setElemenentToState(this.dataPages);
				break;
			case categoriesList:
				this.setElemenentToState(this.dataCategories);
				break;
			case allPosts:
				const dataAllPosts = {
					name: this.get,
					items: this.getAllItems(this.dataPosts)
				};
				this.setElemenentToState(dataAllPosts);
				break;
			case allPages:
				const dataAllPages = {
					name: this.get,
					items: this.getAllItems(this.dataPages)
				};
				this.setElemenentToState(dataAllPages);
				break;
			case allCategories:
				const dataAllCategories = {
					name: this.get,
					items: this.getAllItems(this.dataCategories)
				};
				this.setElemenentToState(dataAllCategories);
				break;
			case postsForId:
				const dataPostsForId = {
					name: this.get,
					items: this.getAllItems(this.props)
				};
				this.setElemenentToState(dataPostsForId);
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

	getItemForId(id, name) {
		let item;
		switch(name) {
			case allPosts:
				if (this.level === 1){
					try {
						item = require(`../storage/posts/post_${id}.json`);
					}
					catch(e) {}
				}
				else if (this.level === 3) {
					try {
						item = require(`../../../storage/posts/post_${id}.json`);
					}
					catch (e) {}
				}
				break;
			case allPages:
				if (this.level === 1) {
					try {
						item = require(`../storage/pages/page_${id}.json`);
					}
					catch (e) {}
				}
				else if (this.level === 3) {
					try {
						item = require(`../../../storage/pages/page_${id}.json`);
					}
					catch (e) {}
				}
				break;
			case allCategories:
				if (this.level === 1) {
					try {
						item = require(`../storage/categories/category_${id}.json`);
					}
					catch (e) {}
				}
				else if (this.level === 3) {
					try {
						item = require(`../../../storage/categories/catgory_${id}.json`);
					}
					catch (e) {}
				}
				break;
			default:
				break;
		}
		return item;
	}

	threeLevelRequire(name) {
		let result;
		try {
			result = require(`../../../storage/${name}.json`);
		}
		catch(e) {}
		return result;
	}

	includeData(i = 1) {
		switch (i) {
			case 1:
				this.dataPosts = this.firstLevelRequire('posts');
				this.dataPages = this.firstLevelRequire('pages');
				this.dataCategories = this.firstLevelRequire('categories');
				if (this.dataPosts && this.dataPages && this.dataCategories) {
					this.level = i;
				}
				else {
					this.includeData(3);
				}
				break;
			case 3:
				this.dataPosts = threeLevelRequire('posts');
				this.dataPages = threeLevelRequire('pages');
				this.dataCategories = threeLevelRequire('categories');
				if (this.dataPages && this.dataPosts && this.dataCategories){
					this.level = i;
				}
				else {
					console.error('data catalog \'storage\' is undefined');
				}
				break;
			default:
				break;
		}
	}		

	componentDidMount() {
		this.getRequest();
		console.log(this.level)
	}

  render() {
    return (
      <div>
				{this.state.element}
      </div>
    )
  }
}
