// import { useEffect, useState } from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import classes from 'styles/Home.module.scss';

import {
	SlideContainer,
	DescriptionContainer,
	FeedContainer,
	VideoContainer,
} from 'containers';
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

export default function HomePage(props) {
	return (
		<main className={classes.bgColor}>
			<Head>
				<title>HomePage</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve...'
				/>
			</Head>
			<div>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={9} className='mt-4 mb-5'>
							<VideoContainer />
							<DescriptionContainer />
							<SlideContainer type={'Featured Livestreams'} />
							<SlideContainer type={'Groups'} />
							<SlideContainer type={'Artists'} />
							<SlideContainer type={'Venues'} />
						</Col>
						<Col
							// md={{ order: 'first', span: 3 }}
							className='mt-3'
							xs={12}
							md={3}>
							<FeedContainer />
						</Col>
					</Row>
				</Container>
			</div>
		</main>
	);
}
