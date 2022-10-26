// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import styles from 'styles/Home.module.scss';

// export default function Home() {
// 	const [darkTheme, setDarkTheme] = useState(undefined);
// 	const handleToggle = (event) => {
// 		setDarkTheme(event.target.checked);
// 	};
// 	const storeUserSetPreference = (pref) => {
// 		localStorage.setItem('theme', pref);
// 	};
// 	useEffect(() => {
// 		const root = document.documentElement;
// 		const initialColorValue = root.style.getPropertyValue(
// 			'--initial-color-mode'
// 		);
// 		setDarkTheme(initialColorValue === 'dark');
// 	}, []);
// 	useEffect(() => {
// 		const root = document.documentElement;

// 		if (darkTheme !== undefined) {
// 			if (darkTheme) {
// 				root.setAttribute('data-theme', 'dark');
// 				storeUserSetPreference('dark');
// 			} else {
// 				root.removeAttribute('data-theme');
// 				storeUserSetPreference('light');
// 			}
// 		}
// 	}, [darkTheme]);

// 	return (
// 		<div className={styles.container}>
// 			<Head></Head>

// 			<main className={styles.main}>
// 				<div>
// 					{darkTheme !== undefined && (
// 						<label>
// 							<input
// 								type='checkbox'
// 								checked={darkTheme}
// 								onChange={handleToggle}
// 							/>
// 							Dark
// 						</label>
// 					)}
// 					<h1>Hello there</h1>
// 					<p className={styles.myTitle}>Pranab!</p>
// 				</div>
// 			</main>

// 			<footer className={styles.footer}></footer>
// 		</div>
// 	);
// }

export default function Home() {
	return <h1>Hello</h1>;
}
