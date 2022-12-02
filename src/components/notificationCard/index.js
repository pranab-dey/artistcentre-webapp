import Containter from 'react-bootstrap/Container';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillHeartFill } from 'react-icons/bs';
import { BiTrash } from 'react-icons/bi';

import Image from 'next/image';
import { favUrl } from 'constant/apiResources';
import axiosInstance from 'constant/axios';
import styles from './notification.module.scss';

const normalise = (date) => {
	if (date?.includes('T')) return date.split('T')[0];
	return date ?? '';
};

export default function NotificationCard({ event, type }) {
	const router = useRouter();
	const [userFav, setUserFav] = useState(event?.is_favorite ?? false);

	const handleHeartClick = async (event) => {
		const payload = { event_id: event.id };
		setUserFav((prev) => !prev);
		try {
			if (userFav) {
				const resp = await axiosInstance.delete(favUrl, payload);
			} else {
				const resp = await axiosInstance.post(favUrl, payload);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Containter
			fluid
			className={styles.containter}
			onClick={(e) => {
				e.preventDefault();
				e.s;
				router.push(`/events/${event.id}`);
			}}>
			<div className={styles.layout}>
				<Photo
					src={event?.event_image_url ?? '/assets/no-image.jpeg'}
					id={event?.id}
				/>
				<div className={styles.group}>
					<div className={styles.upper}>
						<Description
							eventTitle={event?.event_name}
							startTime={
								event?.start_time ?? event?.event_start_time
							}
							type={type}
							artistName={event?.artist[0]?.artist_name}
							genre={event?.artist[0]?.artist_genre}
						/>
						<EventType
							type={event?.ticket_price}
							componentType={type}
							event={event}
							userFav={userFav}
							handleHeartClick={handleHeartClick}
						/>
					</div>
					<Divider />
					<div className={styles.lower}>
						<Location
							venue={
								event?.venue?.venue_name ??
								event?.event_location
							}
							startDate={
								event?.start_date ??
								normalise(event?.event_start_date)
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
				src={src || '/assets/no-image.jpeg'}
				width={'300'}
				height={'200'}
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
			{(venue || startDate) && (
				<SlLocationPin className={styles.locationIcon} />
			)}
			<div className={styles.address}>
				{venue ? <div className={styles.place}>{venue} - </div> : null}
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
						{startTime && (
							<IoTimeOutline className={styles.timeIcon} />
						)}
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

const EventType = ({
	type,
	componentType,
	event,
	userFav,
	handleHeartClick,
}) => {
	return (
		<div className='d-flex ' style={{ marginLeft: 'auto' }}>
			{['Notifications'].includes(componentType) ? (
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
					{['Search'].includes(componentType) ? (
						<div className=''>
							<MdOutlineCancel
								className={styles.searchcancelIcon}
							/>
						</div>
					) : (
						isFavourite(event, userFav, handleHeartClick)
					)}
				</>
			)}
		</div>
	);
};

const isFavourite = (event, userFav, handleHeartClick) => {
	if (userFav)
		return (
			<div>
				<BsFillHeartFill
					className={styles.heartIcon}
					onClick={async (e) => {
						e.preventDefault();
						e.stopPropagation();
						await handleHeartClick(event);
					}}
				/>
			</div>
		);

	return (
		<div>
			<AiOutlineHeart
				className={styles.heartIcon}
				onClick={async (e) => {
					e.preventDefault();
					e.stopPropagation();
					await handleHeartClick(event);
				}}
			/>
		</div>
	);
};

const Divider = () => {
	return <div className={styles.divider} />;
};
