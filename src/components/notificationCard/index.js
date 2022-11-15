import Containter from 'react-bootstrap/Container';
import { useRouter } from 'next/router';

import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlineCancel } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';

import Image from 'next/image';
import styles from './notification.module.scss';

const normalise = (date) => {
	if (date?.includes('T')) return date.split('T')[0];
	return date ?? '';
};

export default function NotificationCard({ event, type }) {
	const router = useRouter();
	console.log(type);
	return (
		<Containter
			fluid
			className={styles.containter}
			onClick={(e) => {
				e.preventDefault();
				router.push(`/events/${event.id}`);
			}}>
			<div className={styles.layout}>
				<Photo
					src={event.event_image_url ?? '/assets/no-image.jpeg'}
					id={event.id}
				/>
				<div className={styles.group}>
					<div className={styles.upper}>
						<Description
							eventTitle={event.event_name}
							startTime={
								event.start_time ?? event.event_start_time
							}
							type={type}
							artistName={event.artist[0].artist_name}
							genre={event.artist[0].artist_genre}
						/>
						<EventType
							type={event.ticket_price}
							componentType={type}
						/>
					</div>
					<Divider />
					<div className={styles.lower}>
						<Location
							venue={
								event.venue?.venue_name ?? event.event_location
							}
							startDate={
								event.start_date ??
								normalise(event.event_start_date)
							}
						/>
						{type === 'History' && (
							<BiTrash className={styles.trashIcon} />
						)}
					</div>
				</div>
			</div>
		</Containter>
	);
}

const Photo = ({ src, id }) => {
	return (
		<div className={styles.imageContainer}>
			<Image
				src={src}
				width={'300px'}
				height={'200px'}
				layout='responsive'
				objectFit='cover'
				alt={`image-for-${id}`}
				style={{ borderRadius: '10px' }}
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

const Description = ({
	eventTitle,
	startTime,
	endTime,
	type,
	artistName = 'v',
	genre,
}) => {
	return (
		<div style={{ flex: 1 }}>
			<span className={styles.desc}>{eventTitle}</span>
			<div className='d-flex justify-content-flex-start align-items-center mt-1 m-1'>
				{type === 'Notifications' ? (
					<div className={styles.artistdetails}>
						{artistName && <span>{artistName}</span>}
						{genre && (
							<>
								<span>|</span>
								<span>Genre - {genre}</span>
							</>
						)}
					</div>
				) : (
					<>
						<IoTimeOutline className={styles.timeIcon} />
						<div className={styles.timeFont}>
							<span>{startTime}</span>
							{endTime ? (
								<>
									<span className={styles.hiphen}>-</span>
									<span className={styles.time}>
										{endTime}
									</span>
								</>
							) : null}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const EventType = ({ type, componentType }) => {
	return (
		<div
			className='d-flex align-items-center'
			style={{ marginLeft: 'auto' }}>
			{componentType === 'Notifications' ? (
				<MdOutlineCancel className={styles.cancelIcon} />
			) : (
				<>
					<div className={styles.playIconContainer}>
						<Image
							src='/assets/playIcon.png'
							width={'50%'}
							height={'50%'}
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
				</>
			)}
		</div>
	);
};

const Divider = () => {
	return <div className={styles.divider} />;
};
