export const formatDate = (date) => {
	const day = date.getDate();
	const month = date.getMonth();
	return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${
		day < 10 ? '0' + day : day
	}`;
};
