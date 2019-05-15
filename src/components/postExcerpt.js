import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import getLocale from '../getLocale.js';
import PropTypes from 'prop-types';

// Components
import WpApi from './api.js';


export default class WpPostExcerpt extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.storages = props.storages;
		this.id = props.id;
		this.lang = getLocale();
	}

	
	getPostId() {
		const id = window.location.href.match(/\d+$/);
		return (id)? parseInt(id[0]) : -1;
	}

	render() {
		const element = (data, html) => {
			const post = data.items[0];
			let title, content;
			if (post !== undefined) {
				title = post.title;
				content = post.excerpt;
			}
			else {
				title = 404;
				content = this.lang.NO_CONTENT;
			}
			return (
				<div>
					<Typography variant="h6">{ title }</Typography>
					<Typography>{ html(content) }</Typography>
				</div>
			);
		};
		return (
			<div>
				<WpApi 
					get={'POSTS_FOR_ID'}
					items={[this.id]}
					element={element}
				/>
			</div>
		);
	}
}

WpPostExcerpt.propTypes = {
	id: PropTypes.number.isRequired,
};
