import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import getLocale from '../getLocale.js';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

// Components
import WpApi from './api.js';


export default class WpPostExcerpt extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.iconMore = <ExpandMoreIcon onClick={this.getFull} />;
		this.iconLess = <ExpandLessIcon onClick={this.getExcerpt} />;
		this.state = {
			full: false,
			iconTop : this.iconMore,
			iconBottom : ''
		};
		this.storages = props.storages;
		this.id = props.id;
		this.lang = getLocale();
	}

	getExcerpt = () => {
		this.setState({full: false});
		this.setState({iconTop: this.iconMore});
		this.setState({iconBottom: ''});
	}

	getFull = () => {
		this.setState({full: true});
		this.setState({iconTop: this.iconLess});
		this.setState({iconBottom: this.iconLess});
	};

	render() {
		const element = (data, html) => {
			const post = data.items[0];
			let title, content, fullContent;
			if (post !== undefined) {
				title = post.title;
				content = post.excerpt.replace('[&hellip;]', '...');
				fullContent = post.content;
			}
			else {
				title = 404;
				content = this.lang.NO_CONTENT;
			}
			return (
				<div>
					<Typography variant="h6">{ title }  { this.state.iconTop }</Typography>
					<Typography>{ this.state.full? html(fullContent) : html(content) }{ this.state.iconBottom }</Typography>
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
