import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.css';
import Typography from '@material-ui/core/Typography';

// Components
import WpApi from './api.js';
import WpPost from './post.js';

export default class WpHome extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			allLists: {},
			allListsIsMounted: false
		};
		this.countPostsToPage = 5;
		this.countPagesToSpoiler = 5;
	}

	getNews(selector, postsCount = null) {
		let items = {};
		this.items = [];
		switch(selector) {
			case 'posts':
				items = this.state.allLists.posts.items;
				break;
			case 'pages':
				items = this.state.allLists.pages.items;
				break;
			case 'categories':
				items = this.state.allLists.categories.items;
				break;
		}
		const count = (postsCount === null)? items.length : postsCount;
		for (let i = items.length - 1; i > items.length - 1 - count; i = i - 1  ) {
			this.items.push(items[i])
		}
		return this.items;
	}

	render() {
		const elementAllLists = (data, html) => {
			this.setState({allLists: data}, () => {
				this.setState({allListsIsMounted: true});
			});
			return (
				<div></div>
			);
		};
		const elementHomePost = (data, html) => {
			console.log(data)
			return (
				<Router>
					<Grid className={styles.grid_container} container spacing={8}>
						{ data.items.map((item, index) => {
							return (
								<Grid item key={`post-${index}`} xs={12} sm={12}>
									<Typography variant='h5'>
										<Link to={`/post:${item.id}`}>{ item.title }</Link>
									</Typography>
									<Typography id={`excerpt-post${index}`}>{ html(item.excerpt) }</Typography>
								</Grid>
							);
						}) }
					</Grid>
				</Router>
			);
		};
		const elementWithListsInState = () => {
			const items = this.getNews('posts', this.countPostsToPage);
			return (
			<div>
				<WpApi
					get={'POSTS_FOR_ID'}
					items={items}
					element={elementHomePost}
				/>
			</div>
			);
		}
		return (
			<div>
				{ this.state.allListsIsMounted? elementWithListsInState() : <div></div> }
				<WpApi 
					get={'ALL_LISTS'} 
					element={elementAllLists}
				/>
			</div>
		);
	}
}
