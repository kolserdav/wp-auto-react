import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import getLocale from '../getLocale.js';

// Components
import WpApi from './api.js';


export default class WpPost extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.storages = props.storages;
		this.id = (this.props.id)? this.props.id : this.getPostId();
		this.home = (this.props.home)? 'HOME_POST' : 'POSTS_FOR_ID';
		this.lang = getLocale();
	}
	
	getPostId() {
		const id = window.location.href.match(/\d+$/);
		return (id)? parseInt(id[0]) : -1;
	}

	render() {
		const element = (data, html) => {
			console.log(data)
			const post = data.items[0];
			let title, content;
			if (post !== undefined) {
				title = post.title;
				content = post.content;
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
					get={this.home}
					items={[this.id]}
					element={element}
				/>
			</div>
		);
	}
}
