import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';
import { HistoryContainer } from 'containers';
import { userHistoryUrl } from 'constant/apiResources';

// import { getData } from 'helpers/api-util';

export default function GroupDetail(props) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getUserHistory();
		console.log('use history');
	}, []);

	const getUserHistory = async () => {
		const session = JSON.parse(localStorage.getItem('user'))?.token || '';
		console.log(session);
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
			console.log(error);
		}
	};
	// const { historyDetail } = props;

	if (!data) {
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
		);
	}

	console.log(data);

	return (
		<>
			<Head>
				<title>History | ArtistStream</title>
				<meta name='history' content='' />
			</Head>

			<main className={classes.bgColor}>
				{/* {JSON.stringify(data)} */}
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={12} className=''>
							<HistoryContainer
								detail={data}
								type={'History'}
								limit={4}
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
