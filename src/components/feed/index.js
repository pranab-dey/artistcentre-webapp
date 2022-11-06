import Containter from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GrLocation } from 'react-icons/gr';
import { CiCalendarDate } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { SlLocationPin } from 'react-icons/sl';

import Image from 'next/image';
import styles from './feed.module.scss';

const normalise = (date) => {
	if (date?.includes('T')) return date.split('T')[0];
	return date ?? '';
};

export default function Feed({ event }) {
	return (
		<Containter className={styles.containter}>
			<div className={styles.layout}>
				<Photo src={event.event_image_url} />
				<Description
					eventTitle={event.event_name}
					startTime={event.start_time ?? event.event_start_time}
				/>
				<EventType type={event.ticket_price} />
			</div>
			<Divider />
			<Location
				venue={event.venue.venue_name ?? event.event_location}
				startDate={
					event.start_date ?? normalise(event.event_start_date)
				}
			/>
		</Containter>
	);
}

const Photo = ({ src }) => {
	return (
		<div className={styles.imageContainer}>
			<Image
				src={src}
				alt=''
				title=''
				width={400}
				height={300}
				layout='responsive'
				objectFit='cover'
				className={styles.image}
			/>
		</div>
	);
};

const Location = ({ venue, startDate }) => {
	return (
		<div className={styles.locationContainer}>
			<SlLocationPin className={styles.locationIcon} />
			<div className={styles.address}>
				<div className={styles.place}>{venue}</div>
				{/* <span className={styles.hiphen}> - </span> */}
				<div className={styles.date}>{startDate}</div>
			</div>
		</div>
	);
};

const Description = ({ eventTitle, startTime, endTime }) => {
	return (
		<div style={{ flex: 1 }}>
			<span className={styles.desc}>{eventTitle}</span>
			<div className='d-flex justify-content-flex-start align-items-center mt-1 m-1'>
				<IoTimeOutline className={styles.timeIcon} />
				<div className={styles.timeFont}>
					<span>{startTime}</span>
					{endTime ? (
						<>
							<span className={styles.hiphen}>-</span>
							<span className={styles.time}>12:00 PM</span>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

const EventType = ({ type }) => {
	return (
		<div className='d-flex' style={{ marginLeft: 'auto' }}>
			<div className={styles.playIconContainer}>
				<Image
					src='/assets/playIcon.png'
					width={'40%'}
					height={'30%'}
					alt='First slide'
					className={styles.playIcon}
				/>
				{type ? (
					<span className={styles.paidevent}>Paid Event</span>
				) : (
					<span className={styles.freeevent}>Free Event</span>
				)}
			</div>

			<AiOutlineHeart className={styles.heartIcon} />
		</div>
	);
};

const Divider = () => {
	return <div className={styles.divider} />;
};
