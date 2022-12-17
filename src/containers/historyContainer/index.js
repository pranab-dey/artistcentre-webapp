import { NotificationCard, CustomButton } from 'components';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from 'styles/Detail.module.scss';

export default function HistoryContainer({ type, detail, limit }) {
	const router = useRouter();
	const [loadMore, setLoadMore] = useState(false);
	console.log(detail);

	return (
		<Container className={styles.historyMain}>
			<span style={title}>{type}</span>

			{type === 'History' && detail.length ? (
				<div className='mt-3'>
					<span style={subtitle}>Livestreams</span>
				</div>
			) : null}

			<div style={container}>
				{detail.length ? (
					detail.map((liveStream) => (
						<NotificationCard
							event={liveStream.event}
							key={liveStream.id}
							index={liveStream.id}
							type={type}
						/>
					))
				) : (
					<span style={notFound}>No {type} Found</span>
				)}
				{loadMore &&
					detail.map((liveStream) => (
						<NotificationCard
							event={liveStream.event}
							key={liveStream.id}
							index={liveStream.id}
						/>
					))}
				{detail.length > limit ? (
					<div style={buttonrad}>
						<CustomButton
							variant='secondary'
							btnText='Load More'
							customStyle={button}
							onClick={(e) => setLoadMore(true)}
						/>
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
	minHeight: `64vh`,
	maxHeight: `75vh`,
	boxSizing: 'content-box',
};
const button = {
	color: 'var(--color-primary-accent)',
	fontFamily: 'Poppins',
	fontWeight: 'bold',
	fontSize: 'small',
	borderRadius: '12px',
	border: '1px solid var(--color-primary-accent)',
	width: '45%',
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
