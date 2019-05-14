export default function getLocale() {
	let lang;
	const userLang = navigator.language || navigator.userLanguage;
	if (userLang.match(/ru/)) {
		lang = require('../locales/ru-RU/lang.json');
	}
	else {
		lang = require('../locales/en-US/lang.json');
	}
	return lang;
}
