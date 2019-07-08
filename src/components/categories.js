import React, { Component } from 'react';
import WpOptions from './options.js';
import styles from '../styles.css';


// Components
import WpCategory from './category.js';
import WpApi from './api.js';

export default class WpCategories extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
		const element = (data, html) => {
			const titles = data.titles;
			this.rawData = {
				categories: [],
				posts: []
			};
			titles.map(itemTitles => {
				if (itemTitles.type === 'category') {
					this.rawData.categories.push(itemTitles);
				}
				else if (itemTitles.type === 'post') {
					this.rawData.posts.push(itemTitles);
				}
			});
			const categoriesElement = () => {
				
				this.rawData
			};
			console.log(this.rawData)
			return (
				<div>dsd</div>
			);
		};
    return (
      <div className={styles.categoriesList}>
				<WpApi
					get={'CATEGORIES_LIST'}
					element={element}
				/>
			</div>
    );
  }
}

