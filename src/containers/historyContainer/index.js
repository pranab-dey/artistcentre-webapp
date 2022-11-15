import { NotificationCard, CustomButton } from 'components';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from 'styles/Detail.module.scss';

export default function HistoryContainer({ type, detail }) {
	const router = useRouter();
	const [loadMore, setLoadMore] = useState(false);

	return (
		<Container className={styles.historyMain}>
			{/* <Row> */}
			{/* <Col xs={12} md={12}> */}
			<span style={title}>{type}</span>
			{/* </Col> */}
			{/* </Row> */}
			{/* <Row > */}
			{/* <Col xs={12} md={12}> */}
			<div className='mt-3'>
				<span style={subtitle}>Livestreams</span>
			</div>
			{/* </Col> */}
			{/* <Row> */}
			{/* <Col xs={12} md={12} style={{ border: '1px solid red' }}> */}
			<div style={container}>
				{detail.map((liveStream) => (
					<NotificationCard
						event={liveStream.event}
						key={liveStream.id}
					/>
				))}
			</div>
			{/* </Col> */}
			{/* </Row> */}
			{/* {loadMore &&
						detail.map((liveStream) => <Feed event={liveStream} />)} */}
			{/* </Row> */}
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
	overflowY: 'scroll',
	minHeight: `61vh`,
	boxSizing: 'content-box',
};

{
	/* {detail.length > 6 ? (
				<div>
					<CustomButton
						variant='secondary'
						btnText='Load More'
						customStyle={{
							color: 'var(--color-primary-accent)',
							fontFamily: 'Poppins',
							fontWeight: 'bold',
							fontSize: 'small',
							borderRadius: '12px',
							border: '1px solid var(--color-primary-accent)',
						}}
						onClick={(e) => setLoadMore(true)}
					/>
				</div>
			) : null} */
}
