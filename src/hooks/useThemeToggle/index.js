import { useState, useEffect } from 'react';

const useThemeToggle = () => {
	const [darkTheme, setDarkTheme] = useState(undefined);

	useEffect(() => {
		console.log('theme-1st use Effect');
		const root = document.documentElement;
		const initialColorValue = root.style.getPropertyValue(
			'--initial-color-mode'
		);
		setDarkTheme(initialColorValue === 'dark');
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		console.log('theme-2nd use Effect');

		if (darkTheme !== undefined) {
			if (darkTheme) {
				root.setAttribute('data-theme', 'dark');
				storeUserSetPreference('dark');
			} else {
				root.removeAttribute('data-theme');
				storeUserSetPreference('light');
			}
		}
	}, [darkTheme]);

	const handleToggle = (event) => {
		setDarkTheme(event.target.checked);
	};

	const storeUserSetPreference = (pref) => {
		localStorage.setItem('theme', pref);
	};

	return [darkTheme, handleToggle];
};

export default useThemeToggle;
