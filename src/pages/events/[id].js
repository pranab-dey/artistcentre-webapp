import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';

import {
	DescriptionContainer,
	AdditionalStreamsContainer,
	VideoContainer,
	SlideContainer,
	ArtistContainer,
} from 'containers';
import { AsyncSpinner } from 'components';

import { getData } from 'helpers/api-util';

export default function GroupDetail(props) {
	const { eventDetail } = props;

	if (!eventDetail) {
		return (
			// <Container className={classes.searchMain}>
			// 	<p className={{}}>Loading...</p>
			// </Container>
			<AsyncSpinner />
		);
	}

	return (
		<>
			<Head>
				<title>{eventDetail.event_name?.trim()}</title>
				<meta
					name='description'
					content={eventDetail?.event_biography}
				/>
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={8} className='mt-3'>
							<VideoContainer topEvent={eventDetail} />
							<DescriptionContainer topEvent={eventDetail} />
						</Col>
						<Col xs={12} md={4} className='mt-3'>
							<ArtistContainer topEvent={eventDetail} />
							<AdditionalStreamsContainer
								topEvent={eventDetail}
							/>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12} className='mb-5'>
							<SlideContainer
								type={'Artists'}
								slideContent={eventDetail.artist}
							/>
						</Col>
					</Row>
					{/* <Row>
						<Col xs={12} md={9} className='mt-0 mb-4'>
							<SlideContainer
								type={'Groups'}
								slideContent={eventDetail.artist_group}
							/>
						</Col>
						<Col xs={12} md={3} className='mb-3'>
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
					</Row> */}
				</Container>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const allEventsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/events/list/?type=home';
	const eventsList = await getData(allEventsUrl);

	const paths = eventsList.data.map((event) => ({
		params: { id: event.id.toString() },
	}));

	return {
		paths: paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = async (context) => {
	const eventId = Number(context.params.id);

	const singleEventUrl = `https://artistcentre.idlewilddigital.com/api/v1.0.0/events/${eventId}/`;

	const result = await fetch(singleEventUrl);
	const eventDetail = await result.json();

	return {
		props: {
			eventDetail,
		},
		revalidate: 60,
	};
};
