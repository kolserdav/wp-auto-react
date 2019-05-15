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

function	analyzeUrl() {
	const url = window.location.href;
	const path = url.match(/post:\d+/);
	return (path)? parseInt(path[0].replace('post:', '')) : -1;
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
