import React, { Component } from 'react';
import WpOptions from './options.js';
import styles from '../styles.css';
import getLocale from '../getLocale.js';


// Components
import WpCategory from './category.js';
import WpApi from './api.js';
import WpCategoriesMenu from './categoriesMenu.js';

export default class WpCategories extends Component {

  constructor(props) {
    super(props);
    this.props = props;
		this.lang = getLocale();
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
			return (
				<div>
					<WpCategoriesMenu
						elements={this.rawData}
					/>
				</div>
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

