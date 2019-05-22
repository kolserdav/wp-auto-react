import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from '../styles.css';
import Typography from '@material-ui/core/Typography';
import getLocale from '../getLocale.js';
import { getNews, analyzeUrl } from '../helper.js';
import { createStore } from 'redux';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';


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
			pagination: ''
		};
		this.pathName = window.location.pathname.replace(/\d+$/, '');
		this.lang = getLocale();
		this.countPostsToPage = (props.count)? props.count : 5;
	}

	makePostsList(items, length) {
		const list = items.map(item => {
			return (
					<WpPostExcerpt
						id={item}
						key={`post-excerpt-${item}`}
					></WpPostExcerpt>
			);
		});
		const pagination = this.createPagination(length);
		return (<div>{list} {pagination}</div>);
	}

	createPagination(length) {
		this.pagination = [];
		const left = (this.id === 1)? '' : <Link key={'pagination-arrow-left'} to={`${this.pathName}${this.id - 1}`}><ChevronLeft /></Link>;
		const right = (this.id === length)? '' : <Link key={'pagination-arrow-right'} to={`${this.pathName}${this.id + 1}`}><ChevronRight /></Link>;
		this.pagination.push(left)
		for (let i = 1; i < length + 1; i ++) {
			if (i === this.id){
				this.pagination.push(`      ${i}			  `)
			}
			else {
				this.pagination.push(<Link className={styles.link} key={`pagination-${i}`} to={`${this.pathName}${i}`}>      {i}      </Link>);
			}
		}
		this.pagination.push(right);
		return (<div>{this.pagination}</div>);
	}

	render() {
		this.id = analyzeUrl('list:');
		const postsList = (data, html) => {
			const list = data.items;
			if (list.length >= this.countPostsToPage) {
				const firstList = getNews(list, this.countPostsToPage);
				this.elementChunks = firstList.map(item => {
						return this.makePostsList(item, firstList.length);
				});
				return this.elementChunks[this.id - 1];
			}
			else {
				return this.makePostsList(list);
			}
			return (
				<div></div>
			);
		};
		return (
			<Paper className={styles.paper}>
				<Typography variant='h5' className={styles.headerOfBlock}>{ this.lang.POSTS_LIST_HEADER }</Typography>
				<WpApi
					get={'POSTS_LIST'}
					element={postsList}
				/>
      </Paper>
		);
	}
}

