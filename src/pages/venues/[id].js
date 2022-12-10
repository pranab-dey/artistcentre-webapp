import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

import classes from 'styles/Detail.module.scss';
import { DetailContainer, FeedContainer, SlideContainer } from 'containers';
import { AsyncSpinner } from 'components';

import { getData } from 'helpers/api-util';
import styles from 'styles/Detail.module.scss';

export default function VenueDetail(props) {
	const { venueDetail } = props;

	if (!venueDetail) {
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
				<title>{venueDetail.venue_name?.trim()}</title>
				<meta
					name='description'
					content={venueDetail?.venue_description || 'ArtistStream'}
				/>
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={8} className=''>
							<DetailContainer
								detail={venueDetail}
								type={'Venue'}
							/>
						</Col>
						<Col xs={12} md={4} className='mt-3'>
							<FeedContainer
								liveStreams={venueDetail.events}
								height={'62vh'}
								limit={3}
							/>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={8} className='mt-0 mb-4'>
							<SlideContainer
								type={'Groups'}
								slideContent={venueDetail.groups}
							/>
						</Col>
						<Col xs={12} md={4} className='mb-3 mt-2'>
							<div
								style={{
									backgroundColor: 'White',
									boxShadow:
										'0px 5px 10px rgba(0, 0, 0, 0.1)',
									borderRadius: '15px',
									width: '100%',
									height: '35vh',
									// marginBottom: ''
								}}>
								Google Location Marker
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12} className='mb-5'>
							<SlideContainer
								type={'Artists'}
								slideContent={venueDetail.artists}
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const allVenueListUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/venues-home-list';

	const venueList = await getData(allVenueListUrl);

	const paths = venueList.data.map((venue) => ({
		params: { id: venue.id.toString() },
	}));

	return {
		paths: paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = async (context) => {
	const venueId = Number(context.params.id);

	const singleVenueUrl = `https://artistcentre.idlewilddigital.com/api/v1.0.0/events/venues/${venueId}/`;

	const result = await fetch(singleVenueUrl);
	const venueDetail = await result.json();

	return {
		props: {
			venueDetail,
		},
		revalidate: 3600,
	};
};
