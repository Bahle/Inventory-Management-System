function fieldLabel(item) {
	item = item.replace('_', ' ');

	return item[0].toUpperCase() + item.substr(1);
}

export { fieldLabel };