export default function getFontSize(content) {
	const div = document.createElement('div');
	div.innerHTML = content;
	let fontSize, wpPClassField;
	try {
		wpPClassField = div.querySelector('p');
	}
	catch(e) {}
	if (!wpPClassField) {
		console.warn(content)
	}
	const wpPClass = (wpPClassField)? wpPClassField.getAttribute('class') : '';
	switch(wpPClass) {
		case 'has-small-font-size':
			fontSize = 'caption';
			break;
		case 'has-large-font-size':
			fontSize = 'body1';
			break;
		case 'has-huge-font-size':
			fontSize = "subtitle1";
			break;
		default:
			fontSize = 'body2';
			break;
	}
	return fontSize;
}

