## Wordpress API 

Wordpress json data API component, use data from Wordpress in to React without server 

### Instalation

```
npm install wp-auto-react
```

### Usage

##### First save data from Wordpress to JSON files

```
node node_modules/wordpress-data/index --host http://you.wordpress.site
``` 

##### Still connect to data from React 

Include module to React component

```
import WordpressApi from 'wp-auto-react'
```

Create element with using data

```
/*
* @data - Object
* @html - Function
*/
const element = (data, html) => {
	console.log(data); // show needed data
	return <div>
			<div>{data.items[0].title}</div>
			<div>{html(data.items[0].content)}
		</div>
}
```

Request data from render method

```
render () {
	return (
		<div>
			<WordpressApi
				get={'POSTS_FOR_ID'} //require property
				items={''} // require for _get_ with _ID
				element={element} // require for all
			 />
		</div>
	);
}
```

##### Accepted get methods

```
POSTS_FOR_ID
PAGES_FOR_ID
CATEGORIES_FOR_ID
POSTS_LISTS
PAGES_LISTS
CATAGORIES_LISTS
ALL_PAGES
ALL_POSTS
ALL_CATEGORIES
```
