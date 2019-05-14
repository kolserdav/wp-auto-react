import React, { Component } from 'react';
import { WpPost, WpDecorator } from 'reactlibrary';
import { Link } from 'react-router-dom';

export default class App extends Component {
  render () {
		const element = (args, html) => {
			console.log(args)
			return (
				<div>{html(args.items[0].content)}</div>
			);
		}
    return (
      <WpDecorator />
    );
  }
}
