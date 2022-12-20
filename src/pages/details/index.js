import Head from 'next/head';
import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Iframe from 'react-iframe';

import { AsyncSpinner } from 'components';

import classes from 'styles/Home.module.scss';

export default function Details(props) {
	const router = useRouter();
	const { hasLiveUrl } = router.query;
	// console.log(hasLiveUrl);

	return (
		<main className={classes.bgColor}>
			<Head>
				<title>ArtistStream</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve...'
				/>
			</Head>

			<div
				className={classes.iframePlaceholder}
				style={{ height: '100vh', width: '100vw' }}>
				<Iframe
					url={hasLiveUrl}
					width='100%'
					height='100%'
					id=''
					className=''
					loading='true'
				/>
			</div>
		</main>
	);
}
