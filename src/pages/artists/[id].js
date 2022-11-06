import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';
import { DetailContainer, FeedContainer, SlideContainer } from 'containers';

import { getData } from 'helpers/api-util';

export default function GroupDetail(props) {
	const { artistDetail } = props;

	if (!artistDetail) {
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
		);
	}

	// console.log(artistDetail);

	return (
		<>
			<Head>
				<title>{artistDetail.artist_name?.trim()}</title>
				<meta
					name='description'
					content={artistDetail?.artist_biography}
				/>
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={9} className=''>
							<DetailContainer
								detail={artistDetail}
								type={'Artist'}
							/>
						</Col>
						<Col xs={12} md={3} className='mt-3'>
							<FeedContainer
								liveStreams={artistDetail.artist_event}
								height={'62vh'}
								limit={3}
							/>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={9} className='mt-0 mb-4'>
							<SlideContainer
								type={'Groups'}
								slideContent={artistDetail.artist_group}
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
					</Row>
					<Row>
						<Col xs={12} md={12} className='mb-5'>
							<SlideContainer
								type={'Venues'}
								slideContent={artistDetail.artist_venue}
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const allArtistsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/artists/?type=home';
	const artistsList = await getData(allArtistsUrl);

	const paths = artistsList.data.map((artist) => ({
		params: { id: artist.id.toString() },
	}));

	return {
		paths: paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = async (context) => {
	const artistId = Number(context.params.id);

	const singleArtistUrl = `https://artistcentre.idlewilddigital.com/api/v1.0.0/users/artists/${artistId}/`;

	const result = await fetch(singleArtistUrl);
	const artistDetail = await result.json();

	return {
		props: {
			artistDetail,
		},
		revalidate: 3600,
	};
};
