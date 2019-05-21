import React, { Component } from 'react';
import { analyzeUrl } from '../helper.js';

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
			console.log(23,data)
			return (
				<div>{data.id}</div>
			);
		}
    return (
      <div>
			</div>
    );
  }
}

