import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Home.module.scss';
import { getEventsList } from 'helpers/api-util';

import {
	SlideContainer,
	DescriptionContainer,
	FeedContainer,
	VideoContainer,
} from 'containers';

// 	return (
// 		<div className={styles.container}>
// 			<Head></Head>

// 			<main className={styles.main}>
// 				<div>

// 					<h1>Hello there</h1>
// 					<p className={styles.myTitle}>Pranab!</p>
// 				</div>
// 			</main>

// 			<footer className={styles.footer}></footer>
// 		</div>
// 	);
// }

export default function HomePage(props) {
	const { eventsList, groupList, artistList, venueList } = props;

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
						<Col xs={12} md={9} className='mt-4 mb-1'>
							<VideoContainer topEvent={eventsList.data[0]} />
							<DescriptionContainer
								topEvent={eventsList.data[0]}
							/>
							<SlideContainer
								type={'Featured Livestreams'}
								slideContent={eventsList.data.slice(1, 6)}
							/>
							<SlideContainer
								type={'Groups'}
								slideContent={groupList.data}
							/>
							<SlideContainer
								type={'Artists'}
								slideContent={artistList.data}
							/>
							<SlideContainer
								type={'Venues'}
								slideContent={venueList.data}
							/>
						</Col>
						<Col className='mt-3' xs={12} md={3}>
							<FeedContainer
								liveStreams={eventsList.data.slice(6)}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		</main>
	);
}

export async function getStaticProps() {
	const allEventsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/list/?type=home';
	const allGroupsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/band-group-list/?type=home';
	const allArtistsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/artists/?type=home';
	const allVenueListUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/venues-home-list';

	const eventsList = await getEventsList(allEventsUrl);
	const groupList = await getEventsList(allGroupsUrl);
	const artistList = await getEventsList(allArtistsUrl);
	const venueList = await getEventsList(allVenueListUrl);

	return {
		props: {
			eventsList,
			groupList,
			artistList,
			venueList,
		},
		revalidate: 10,
	};
}
