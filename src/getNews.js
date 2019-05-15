export default function getNews(selector, postsCount = null) {
		let items = {};
		this.items = [];
		switch(selector) {
			case 'posts':
				items = this.state.allLists.posts.items;
				break;
			case 'pages':
				items = this.state.allLists.pages.items;
				break;
			case 'categories':
				items = this.state.allLists.categories.items;
				break;
		}
		const count = (postsCount === null)? items.length : postsCount;
		for (let i = items.length - 1; i > items.length - 1 - count; i = i - 1  ) {
			this.items.push(items[i])
		}
		return this.items;
	}
