import React, { Component } from 'react';
import { analyzeUrl } from '../helper.js';
import styles from '../styles.css';

// Components
import WpApi from './api.js';

export default class WpPage extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
		this.id = analyzeUrl('page:');
		const element = (data, html) => {
			const item = data.items[0];
			return (
				<div className={styles.page}>{item.title}{html(item.content)}</div>
			);
		}
    return (
      <div>
				<WpApi
					get={'PAGES_FOR_ID'}
					items={[this.id]}
					element={element}
				/>
			</div>
    );
  }
}

