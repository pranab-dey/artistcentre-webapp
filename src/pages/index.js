import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
// import { useState, useEffect, useCallback } from 'react';
// import axiosInstance from 'constant/axios';
import { getCookie, hasCookie } from 'cookies-next';

// import { AsyncSpinner } from 'components';
// import {
// 	allEventsUrl,
// 	allGroupsUrl,
// 	allArtistsUrl,
// 	allVenueListUrl,
// } from 'constant/apiResources';

import classes from 'styles/Home.module.scss';
import { getData } from 'helpers/api-util';

import {
	SlideContainer,
	DescriptionContainer,
	FeedContainer,
	VideoContainer,
} from 'containers';

export default function HomePage(props) {
	const router = useRouter();

	// const [eventsList, setEventList] = useState(null);
	// const [groupList, setGroupList] = useState(null);
	// const [artistList, setArtistList] = useState(null);
	// const [venueList, setVenueList] = useState(null);

	const { eventsList, groupList, artistList, venueList } = props;

	const refreshData = async () => {
		router.replace(router.asPath);
	};

	// useEffect(() => {
	// 	const fetchdata = async () => {
	// 		const events = await axiosInstance.get(allEventsUrl, {
	// 			headers: {
	// 				// 'Cache-Control': 'no-cache',
	// 				// Pragma: 'no-cache',
	// 				// Expires: '0',
	// 			},
	// 		});

	// 		// const groups = await getData(allGroupsUrl);
	// 		// const artists = await getData(allArtistsUrl);
	// 		// const venues = await getData(allVenueListUrl);

	// 		setEventList(events.data);
	// 		// setGroupList(groups);
	// 		// setArtistList(artists);
	// 		// setVenueList(venues);
	// 	};

	// 	fetchdata();
	// }, []);

	// if (!eventsList || !groupList || !artistList || !venueList)
	// 	return <AsyncSpinner />;

	// if (!eventsList) return <AsyncSpinner />;
	// console.log(eventsList);

	return (
		<main className={classes.bgColor}>
			<Head>
				<title>ArtistStream</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve...'
				/>
			</Head>

			{eventsList.data ? (
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
									refreshData={refreshData}
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
			) : null}
		</main>
	);
}

// import cookies from 'next-cookies';

export async function getServerSideProps({ req, res }) {
	res.setHeader('Cache-Control', 'no-store');
	// const { token } = cookies(context);
	// const tokenFromNext = getCookie('token', { req, res });
	const token = getCookie('token', { req, res });

	console.log('getServerToken:: ', token);

	const allEventsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/list/?type=home';
	const allGroupsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/band-group-list/?type=home';
	const allArtistsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/artists/?type=home';
	const allVenueListUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/venues-home-list';

	const eventsList = await getData(allEventsUrl, token);
	const groupList = await getData(allGroupsUrl, token);
	const artistList = await getData(allArtistsUrl, token);
	const venueList = await getData(allVenueListUrl, token);

	// res.setHeader(
	// 	'Cache-Control',
	// 	'public, s-maxage=10, stale-while-revalidate=59'
	// );

	return {
		props: {
			eventsList,
			groupList,
			artistList,
			venueList,
		},
	};
}

// export async function getStaticProps() {
// 	const allEventsUrl =
// 		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/list/?type=home';
// 	const allGroupsUrl =
// 		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/band-group-list/?type=home';
// 	const allArtistsUrl =
// 		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/artists/?type=home';
// 	const allVenueListUrl =
// 		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/venues-home-list';

// 	const eventsList = await getData(allEventsUrl);
// 	const groupList = await getData(allGroupsUrl);
// 	const artistList = await getData(allArtistsUrl);
// 	const venueList = await getData(allVenueListUrl);

// 	return {
// 		props: {
// 			eventsList,
// 			groupList,
// 			artistList,
// 			venueList,
// 		},
// 		revalidate: 60,
// 	};
// }
