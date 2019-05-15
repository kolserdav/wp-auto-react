import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.css';
import Typography from '@material-ui/core/Typography';
import getLocale from '../getLocale.js';
import { getNews } from '../helper.js';
import { createStore } from 'redux';

// Components
import WpApi from './api.js';
import WpPost from './post.js';
import WpPostExcerpt from './postExcerpt.js';

export default class WpPostsList extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			postsList: {},
			postsListIsMounted: false,
		};
		this.lang = getLocale();
		this.countPostsToPage = (props.count)? props.count : 5;
	}

	makePostsList(list) {
		return list.map(item => {
			return (
					<WpPostExcerpt
						id={item}
						key={`post-excerpt-${item}`}
					></WpPostExcerpt>
			);
		});
	}

	render() {
		const elementPostsList = (data, html) => {
			this.setState({postsList: data}, () => {
				this.setState({postsListIsMounted: true});
			});
			return (
				<div></div>
			);
		};
		const postsList = () => {
			const list = this.state.postsList.items;
			if (list.length >= this.countPostsToPage) {
				const firstList = getNews(list, this.countPostsToPage);
				//TODO list pagination
				return this.makePostsList(firstList[0])
			}
			else {
				return this.makePostsList(list);
			}
			return (
				<div></div>
			);
		};
		return (
			<div>
				{ this.state.postsListIsMounted? postsList() : <div></div> }
				<WpApi
					get={'POSTS_LIST'} 
					element={elementPostsList}
				/>
			</div>
		);
	}
}
