import React, { Component } from 'react';


export default class WpPost extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<div>Post{this.props.id}</div>
		);
	}
}
