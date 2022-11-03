import Containter from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GrLocation } from 'react-icons/gr';
import { CiCalendarDate } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';

import styles from './description.module.scss';

export default function Description({ topEvent }) {
	// const addressHead = topEvent.event_location.split(',')[0].trim();
	// const addressTitle = topEvent.event_location
	// 	.split(addressHead + ',')[1]
	// 	.replace(/,\s*$/, '');

	const eventType = !!topEvent.ticket_price;

	return (
		<Containter className={styles.containter}>
			<Row>
				<Col
					className='d-flex flex-column justify-content-flex-start align-items-flex-start px-4'
					md={9}
					xs={9}>
					<Title
						eventTitle={topEvent.event_name}
						artistName={topEvent.artist[0].artist_name}
						artistGenre={topEvent.artist[0].artist_genre}
					/>
					<Location
						eventAddressHead={topEvent.venue.venue_name}
						eventAddressTail={topEvent.venue.venue_address}
					/>
				</Col>
				<Col md={3} xs={3} style={{ marginLeft: '0px' }}>
					<EventType type={eventType} />
				</Col>
			</Row>
			<Row className='px-3'>
				<Divider />
				<Duration
					startDate={topEvent.start_date}
					startTime={topEvent.start_time}
				/>
			</Row>
		</Containter>
	);
}

const Title = ({ eventTitle, artistName, artistGenre }) => {
	return (
		<>
			<h4 className={styles.title}>{eventTitle}</h4>
			<div className={styles.subTitle}>
				<span className={styles.band}>{artistName}</span>
				{artistGenre && (
					<>
						<span className={styles.hiphen}>|</span>
						<span className={styles.genre}>
							Genre - {artistGenre}
						</span>
					</>
				)}
			</div>
		</>
	);
};

const Location = ({ eventAddressHead, eventAddressTail }) => {
	return (
		<div className='d-flex justify-content-flex-start align-items-center mt-2 mb-3'>
			<GrLocation className={styles.locationIcon} />
			<div className={styles.address}>
				<div className={styles.place}>{eventAddressHead}</div>
				<div className={styles.road}>{eventAddressTail}</div>
			</div>
		</div>
	);
};

const Duration = ({ startDate, startTime, endDate, endTime }) => {
	return (
		<div className='d-flex gap-5'>
			<div className='d-flex justify-content-flex-start align-items-center'>
				<CiCalendarDate className={styles.calenderIcon} />
				<div className={styles.font}>
					<span>{startDate}</span>
					{endTime ? (
						<>
							<span className={styles.hiphen}>-</span>
							<span>{endTime}</span>
						</>
					) : null}
				</div>
			</div>

			<div className='d-flex justify-content-flex-start align-items-center'>
				<IoTimeOutline className={styles.timeIcon} />
				<div className={styles.font}>
					<span>{startTime}</span>
					{endTime ? (
						<>
							<span className={styles.hiphen}>-</span>
							<span>12:00 PM</span>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

const Divider = () => {
	return <hr className={styles.divider} />;
};

const EventType = ({ type }) => {
	return type ? (
		<div
			className='d-flex justify-content-flex-end'
			style={{ marginLeft: '100px' }}>
			<div className={styles.playIconContainer}>
				<Image
					src='/assets/playIcon.png'
					width={'90%'}
					height={'70%'}
					alt='First slide'
					className={styles.playIcon}
				/>
				<span>Paid Event</span>
			</div>
		</div>
	) : null;
};
