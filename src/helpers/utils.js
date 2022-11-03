export const capitalizeFirstLetter = (string) => {
	return `** ${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const validationTextFor = (label) => {
	return `${label} is required`;
};

export const sleep = (ms) => {
	// eslint-disable-next-line no-promise-executor-return
	return new Promise((resolve) => setTimeout(resolve, ms));
};
