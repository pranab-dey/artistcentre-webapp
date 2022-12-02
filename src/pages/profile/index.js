import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from 'styles/Detail.module.scss';
import { ProfileContainer } from 'containers';
import { userProfileUrl } from 'constant/apiResources';

import styles from 'styles/Detail.module.scss';

export default function Profile(props) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getUserProfile();
	}, []);

	const getUserProfile = useCallback(async () => {
		const session = JSON.parse(localStorage.getItem('user'))?.token || '';
		setLoading(true);
		try {
			const response = await axios({
				method: 'GET',
				url: userProfileUrl,
				headers: {
					Authorization: `Bearer ${session}`,
					'Content-Type': 'application/json',
				},
			});
			// console.log(response);
			const { data } = response;
			setData(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const updateUserData = useCallback(async (payload) => {
		const session = JSON.parse(localStorage.getItem('user'))?.token || '';
		setLoading(true);
		try {
			const response = await axios({
				method: 'PUT',
				data: payload,
				url: userProfileUrl,
				headers: {
					Authorization: `Bearer ${session}`,
					'Content-Type': 'application/json',
				},
			});
			// console.log(response.data);
			setData(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	});

	if (!data) {
		return (
			<Container className={styles.searchMain}>
				<p className={{}}>Loading...</p>
			</Container>
		);
	}

	return (
		<>
			<Head>
				<title>Profile | ArtistStream</title>
				<meta name='profile' content='' />
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col xs={12} md={12} className=''>
							<ProfileContainer
								profile={data}
								updateUserData={updateUserData}
								type={'Settings'}
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
