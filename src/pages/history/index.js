import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';
import { HistoryContainer } from 'containers';
import { userHistoryUrl } from 'constant/apiResources';
import { AsyncSpinner } from 'components';

import styles from 'styles/Detail.module.scss';

export default function GroupDetail(props) {
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
				url: userHistoryUrl,
				headers: {
					Authorization: `Bearer ${session}`,
					'Content-Type': 'application/json',
				},
			});
			const { data } = response.data;
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
				<title>History | ArtistStream</title>
				<meta name='history' content='' />
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={12} className=''>
							{data ? (
								<HistoryContainer
									detail={data}
									type={'History'}
									limit={4}
								/>
							) : null}
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
