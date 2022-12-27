import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';
import { HistoryContainer } from 'containers';
import { AsyncSpinner } from 'components';

import { userNotificationUrl } from 'constant/apiResources';

import styles from 'styles/Detail.module.scss';

export default function Notification(props) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getUserHistory();
	}, []);

	const getUserHistory = async () => {
		const session = JSON.parse(localStorage.getItem('user'))?.token || '';

		setLoading(true);
		try {
			const response = await axios({
				method: 'GET',
				url: userNotificationUrl,
				headers: {
					Authorization: `Bearer ${session}`,
					'Content-Type': 'application/json',
				},
			});
			const { data } = response.data;
			console.log({ data });
			setData(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	if (!data) {
		return (
			<AsyncSpinner />
			// <Container className={styles.searchMain}>
			// 	<p className={{}}>Loading...</p>
			// </Container>
		);
	}

	return (
		<>
			<Head>
				<title>Notifications | ArtistStream</title>
				<meta name='notifications' content='' />
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={12} className=''>
							<HistoryContainer
								detail={data}
								type={'Notifications'}
								limit={4}
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}

// const a = [
// 	{
// 		id: 58,
// 		event: {
// 			id: 787,
// 			is_favorite: false,
// 			event_name: 'Pete Whitman At Jazz Central Studios',
// 			lat_lng: {},
// 			event_location: null,
// 			event_description: '',
// 			event_image_url: null,
// 			event_livestream_url: 'http://jazzcentralstudios.org/',
// 			ticket_price: ' $10',
// 			start_date: '11/06/2021',
// 			start_time: '08:00 PM',
// 			event_type: {
// 				type_name: '',
// 			},
// 			venue: {
// 				id: 26,
// 				venue_address: '',
// 				lat_lng: {},
// 				venue_email: null,
// 				venue_social_media_fb_link: '',
// 				venue_social_media_yt_link: '',
// 				venue_social_media_insta_link: '',
// 				venue_genre: null,
// 				venue_image: null,
// 				venue_mobile: null,
// 				venue_name: 'Jazz Central Studios',
// 				venue_web_address: '',
// 			},
// 			artist: [
// 				{
// 					id: 410,
// 					artist_address: '',
// 					lat_lng: {},
// 					artist_biography: '',
// 					email: null,
// 					artist_social_media_fb_link: '',
// 					artist_social_media_insta_link: '',
// 					artist_social_media_yt_link: '',
// 					artist_genre: 'Jazz!!',
// 					artist_image: null,
// 					artist_instrument: 'saxophone, tenor',
// 					artist_mobile: '',
// 					artist_name: 'Pete Whitman',
// 					artist_sub_genre: '',
// 					artist_web_address: '',
// 				},
// 			],
// 			group: [
// 				{
// 					lat_lng: {},
// 					group_name: 'Pete Whitman At Jazz Central Studios',
// 					group_biography: '',
// 				},
// 			],
// 		},
// 		created_at: '2022-10-21T07:32:34.729041-07:00',
// 		user: 2765,
// 	},
// ];
