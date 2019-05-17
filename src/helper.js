import { createStore } from 'redux';

function Helpers() {}

function newStore(actionType, property, args = []) {
	return createStore((state = [], action) => {
 		 switch (action.type) {
			 case actionType:
				 return action[property];
			 default:
				 return state;
		 }
	 }, args);
}

function	analyzeUrl(selector = 'post:') {
	const url = window.location.href;
	let path;
	switch(selector) {
		case 'post:': 
			path = url.match(/post:\d+/);
			break;
		case 'list:':
			path = url.match(/list:\d+/);
			break;
		case 'num':
			path = url.match(/num:\d+/);
			break;
	}
	return (path)? parseInt(path[0].replace(selector, '')) : -1;
}		

function getNews(items, postsCount = null) {
	const count = (postsCount === null)? items.length : postsCount;
	const lastItem = items.length - 1;
	let index = 0;
	Helpers.chunk = [];
	Helpers.items = [];
	for (let i = lastItem; items[i]; i = i - 1) {
		index ++;
		Helpers.chunk.push(items[i]);
		if (index === postsCount) {
			index = 0;
			Helpers.items.push(Helpers.chunk);
			Helpers.chunk = [];
		}
	}
	if (Helpers.chunk.length > 0) {
		Helpers.items.push(Helpers.chunk);
	}
	return Helpers.items;
}

export { createStore, analyzeUrl, getNews }
