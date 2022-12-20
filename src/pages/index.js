import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Home.module.scss';
import { getData } from 'helpers/api-util';

import {
	SlideContainer,
	DescriptionContainer,
	FeedContainer,
	VideoContainer,
} from 'containers';

export default function HomePage(props) {
	const { eventsList, groupList, artistList, venueList } = props;

	console.log({ eventsList });

	return (
		<main className={classes.bgColor}>
			<Head>
				<title>ArtistStream</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve...'
				/>
			</Head>
			<div>
				<Container fluid='sm'>
					<Row>
						<Col
							xs={12}
							md={9}
							className={`mt-4 ${classes.mainImageContainer}`}>
							<VideoContainer topEvent={eventsList.data[0]} />
							<DescriptionContainer
								topEvent={eventsList.data[0]}
							/>
						</Col>
						<Col
							className={`mt-3 ${classes.mainFeedContainer}`}
							xs={12}
							md={3}>
							<FeedContainer
								liveStreams={eventsList.data.slice(6)}
								limit={4}
								height={'93vh'}
							/>
						</Col>
						<Col
							xs={12}
							md={9}
							className={`mb-5 ${classes.mainImageContainer}`}>
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

	const eventsList = await getData(allEventsUrl);
	const groupList = await getData(allGroupsUrl);
	const artistList = await getData(allArtistsUrl);
	const venueList = await getData(allVenueListUrl);

	return {
		props: {
			eventsList,
			groupList,
			artistList,
			venueList,
		},
		revalidate: 1,
	};
}
