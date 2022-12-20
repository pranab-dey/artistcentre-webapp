import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';
import { DetailContainer, FeedContainer, SlideContainer } from 'containers';

import { getData } from 'helpers/api-util';
import { AsyncSpinner } from 'components';

import styles from 'styles/Detail.module.scss';

export default function GroupDetail(props) {
	const { groupDetail } = props;

	if (!groupDetail) {
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
				<title>{groupDetail.group_name.trim()}</title>
				<meta
					name='description'
					content={groupDetail.group_biography}
				/>
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={8} className=''>
							<DetailContainer
								detail={groupDetail}
								type={'Group'}
							/>
						</Col>
						<Col xs={12} md={4} className='mt-3'>
							<FeedContainer
								liveStreams={groupDetail.group_event}
								height={'61vh'}
								limit={3}
							/>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={8} className='mt-0 mb-4'>
							<SlideContainer
								type={'Artists'}
								slideContent={groupDetail.group_artist}
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
								type={'Venues'}
								slideContent={groupDetail.group_venue}
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const allGroupsUrl =
		'https://artistcentre.idlewilddigital.com/api/v1.0.0/users/band-group-list/?type=home';
	const groupsList = await getData(allGroupsUrl);

	const paths = groupsList.data.map((group) => ({
		params: { id: group.id.toString() },
	}));

	return {
		paths: paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps(context) {
	const groupId = Number(context.params.id);

	const singleGroupUrl = `https://artistcentre.idlewilddigital.com/api/v1.0.0/users/band-group/${groupId}`;

	const result = await fetch(singleGroupUrl);
	const groupDetail = await result.json();

	return {
		props: {
			groupDetail,
		},
		revalidate: 1,
	};
}
