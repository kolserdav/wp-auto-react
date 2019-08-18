import React, { Component } from 'react';
import { analyzeUrl, firstCapitalize } from '../helper.js';
import styles from '../styles.css';
import getLocale from '../getLocale.js';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// Components 
import WpApi from './api.js';


export default class WpCategory extends Component {

  constructor(props) {
    super(props);
    this.props = props;
		this.lang = getLocale();
  }
  
  render() {
		this.id = analyzeUrl('category:');
		const element = (data, html) => {
			let title, categoryTitle, description;
			if (data.items[0] !== undefined) {
				const rawData = data.items[0];
				categoryTitle = rawData.name;
				description = rawData.description;
				const parentCategoryTitle = rawData.parentTitle;
				let parentCategoryId;
				this.posts = [];
				rawData.posts.map(itemPosts => {
					const id = itemPosts.id
					this.posts.push(<Typography key={`post-id-${id}`} variant='body2'><Link to={`/post:${id}`}>{ itemPosts.title }</Link></Typography>);
				});
				this._postsFound = (this.posts.length > 0);
				this._parentFound = false;
				if (rawData.parent === 0) {
					parentCategoryId = this.id
				}
				else {
					this._parentFound = true;
					parentCategoryId = rawData.parent;
				}
				const parentCategoryUrl = `/category:${parentCategoryId}`;
				this.childrenCategories = [];
				this._childFound = false;
				rawData.childTitles.map(item => {
					this._childFound = true;
					const childId = item.id;
					const childTitle = item.title;
					this.childrenCategories.push(<Typography key={`child-id-${childId}`} variant='body2'><Link to={`/category:${childId}`}>{ childTitle }</Link></Typography>);
				});
				title = (
					<Link to={parentCategoryUrl}>{ parentCategoryTitle }</Link>
				);
			}
			else {
				title = this.lang.NO_CATEGORY;
				categoryTitle = null;
				description = null;
			}
			return (
				<div>
					<Typography variant='h4'>{ categoryTitle }</Typography>
					<Typography variant='body1'>{ description !== ''? `${this.lang.DESCRIPTION_CATEGORY} :` : ''} { description }</Typography>
					<Typography variant='body1'>{ this._parentFound? `${this.lang.PARENT_CATEGORY_NAME} :` :  '' } { title }</Typography>
					<Typography variant='body1'> { this._childFound? `${this.lang.CHILD_CATEGORIES} :` : '' }  </Typography>
					{ this.childrenCategories }
					<Typography variant='body1'>{ this._postsFound? `${firstCapitalize(this.lang.POSTS)} :` : '' }</Typography>
					{ this.posts }
				</div>
			);
		};
    return (
      <div className={styles.subHeader}>
				<Typography variant='h6'>{ this.lang.CATEGORY_HEADER }</Typography>
				<WpApi 
					get={'CATEGORIES_FOR_ID'}
					element={element}
					items={[this.id]}
				/>
			</div>
    );
  }
}

