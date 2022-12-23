import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

import classes from 'styles/Detail.module.scss';
import { HistoryContainer } from 'containers';
import { favUrl } from 'constant/apiResources';
import { AsyncSpinner } from 'components';

export default function Preference(props) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const refreshData = useCallback(() => {
		router.replace(router.asPath);
	}, []);

	useEffect(() => {
		getUserPreference();
	}, []);

	const getUserPreference = async () => {
		const session = JSON.parse(localStorage.getItem('user'))?.token || '';
		setLoading(true);
		try {
			const response = await axios({
				method: 'GET',
				url: favUrl,
				headers: {
					Authorization: `Bearer ${session}`,
					'Content-Type': 'application/json',
				},
			});
			const { data } = response.data;
			setData(data);

			// setData(fakedata);
			setLoading(false);
			// console.log(data);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	if (!data) {
		return <AsyncSpinner />;
	}

	return (
		<>
			<Head>
				<title>Preference | ArtistStream</title>
				<meta name='Preference' content='' />
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={12} className=''>
							{data ? (
								<HistoryContainer
									detail={data}
									refreshData={refreshData}
									type={'Preference'}
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
