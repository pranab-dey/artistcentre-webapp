import { DisplayPicture, Settings, EditProfile } from 'components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from 'styles/Detail.module.scss';

export default function ProfileContainer({ profile, type, updateUserData }) {
	const router = useRouter();
	const [loadMore, setLoadMore] = useState(false);

	const handleProfileEditSubmit = useCallback((payload) => {
		console.log('handleProfileEditSubmit');
		console.log({ payload });
		if (payload.mobileV1 || payload.mobileV2)
			payload.artist_mobile =
				payload.mobileV1 + payload.mobileV2 ?? undefined;
		delete payload.mobileV1;
		delete payload.mobileV2;
		updateUserData(payload);
	}, []);

	return (
		<Container className={styles.settingsMain}>
			<span style={title}>{type}</span>
			<Row className='p-2 pt-4 gy-3'>
				<Col md={5} xs={12}>
					<DisplayPicture data={profile} />
				</Col>
				<Col md={7} xs={12}>
					<Settings
						notiStatus={profile.is_notification_allowed}
						handleProfileEditSubmit={handleProfileEditSubmit}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={12} xs={12}>
					<EditProfile
						data={profile}
						handleProfileEditSubmit={handleProfileEditSubmit}
					/>
				</Col>
			</Row>
		</Container>
	);
}

const title = {
	fontSize: '16px',
	fontFamily: 'Poppins',
	fontWeight: 'bold',
	color: 'var(--color-bnw-revert)',
};
