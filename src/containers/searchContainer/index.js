import { NotificationCard, CustomButton } from 'components';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from 'styles/Detail.module.scss';

export default function SearchContainer({ type, detail, limit }) {
	const router = useRouter();
	const [loadMore, setLoadMore] = useState(false);

	return (
		<Container className={styles.searchMain}>
			<span style={title}>Search Results</span>

			<div style={container}>
				{detail.length &&
					detail
						.slice(3, 7)
						.map((liveStream, index) => (
							<NotificationCard
								event={liveStream}
								key={index}
								type={'Search'}
							/>
						))}

				{loadMore &&
					detail
						.slice(7)
						?.map((liveStream, index) => (
							<NotificationCard
								event={liveStream}
								key={index}
								type={'Search'}
							/>
						))}

				{detail.length > 7 && !loadMore ? (
					<div style={buttonrad}>
						<div
							style={{
								minWidth: '363px',
							}}>
							<CustomButton
								variant='secondary'
								btnText='Load More'
								customStyle={button}
								onClick={(e) => setLoadMore(true)}
							/>
						</div>
					</div>
				) : null}
			</div>
		</Container>
	);
}

const title = {
	fontSize: '16px',
	fontFamily: 'Poppins',
	fontWeight: 'bold',
	color: 'var(--color-bnw-revert)',
};

const subtitle = {
	fontSize: '14px',
	fontFamily: 'Roboto',
	fontWeight: 'bold',
	marginTop: '10px',
	color: 'var(--color-primary-accent)',
};

const container = {
	marginTop: '10px',
	overflowY: 'scroll',

	// maxHeight: `75vh`,
	// boxSizing: 'content-box',
};
const button = {
	color: 'var(--color-primary-accent)',
	fontFamily: 'Poppins',
	fontWeight: 'bold',
	fontSize: 'small',
	borderRadius: '12px',
	border: '1px solid var(--color-primary-accent)',
	// width: '45%',
};

const buttonrad = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: '15px',
};

const notFound = {
	fontFamily: 'Poppins',
	fontSize: '12px',
	fontWeight: 'normal',
	color: 'red',
	textAlign: 'center',
};
