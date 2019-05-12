import React, { Component } from 'react'

import WordpressApi from 'reactlibrary'

export default class App extends Component {
  render () {
		const element = (args, html) => {
			console.log(args)
			return (
				<div>{html(args.items[0].content)}</div>
			);
		}
    return (
      <div>
        <WordpressApi 
					get={'POSTS_FOR_ID'}
					items={[40, 42, 443]}
					element={element}/>
				<WordpressApi
					get={'CATEGORIES_LIST'}
					element={element}
				/>
      </div>
    )
  }
}
