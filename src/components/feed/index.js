import Containter from 'react-bootstrap/Container';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { SlLocationPin } from 'react-icons/sl';
import { BsFillHeartFill } from 'react-icons/bs';
import Image from 'next/image';
import { favUrl } from 'constant/apiResources';
import axiosInstance from 'constant/axios';
import { useSearch } from 'appStore/context/search';
import { AppModal } from 'components';
import { hasCookie } from 'cookies-next';

import styles from './feed.module.scss';

const normalise = (date) => {
	if (date?.includes('T')) return date.split('T')[0];
	return date ?? '';
};

export default function Feed({ event, refreshData }) {
	const router = useRouter();
	const [userFav, setUserFav] = useState(null);
	const [isCookie, setIsCookie] = useState(null);
	const has = hasCookie('token');
	const { user = {} } = useSearch();

	useEffect(() => {
		setIsCookie(has);
	}, [has, isCookie]);

	useEffect(() => {
		console.log({ event });
		setUserFav(event.is_favorite);
	}, [event.is_favorite]);

	const hasLiveUrl = event.event_livestream_url ?? '';

	const handleHeartClick = async (event) => {
		const payload = { event_id: event.id };
		setUserFav((prev) => !prev);
		try {
			if (userFav) {
				const resp = await axiosInstance.delete(favUrl, {
					data: { ...payload },
				});
			} else {
				const resp = await axiosInstance.post(favUrl, payload);
			}
			await refreshData();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Containter
			className={styles.containter}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				router.push(`/events/${event.id}`);
			}}>
			<div className={styles.layout}>
				<Photo src={event.event_image_url} />
				<Description
					eventTitle={event.event_name}
					startTime={event.start_time ?? event.event_start_time}
				/>
				<EventType
					type={event.ticket_price}
					event={event}
					userFav={userFav}
					user={user?.token}
					hasLiveUrl={hasLiveUrl}
					handleHeartClick={handleHeartClick}
					hasServerToken={has}
				/>
			</div>
			<Divider />
			<Location
				venue={event.venue?.venue_name ?? event.event_location}
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
				src={src || '/assets/no-image.jpeg'}
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
				{venue && <div className={styles.place}>{venue} - </div>}
				<div className={styles.date}> {startDate}</div>
			</div>
		</div>
	);
};

const Description = ({ eventTitle, startTime, endTime }) => {
	return (
		<div style={{ flex: '1' }}>
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

const EventType = ({
	type,
	event,
	user,
	userFav,
	hasLiveUrl,
	handleHeartClick,
	hasServerToken,
}) => {
	const router = useRouter();

	const handlePlayIconClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('called iframe: ', hasLiveUrl);

		try {
			if (hasLiveUrl) {
				router.push(
					{
						pathname: '/details',
						query: {
							hasLiveUrl,
						},
					},
					'/details'
				);
				const payload = { event_id: Number(event.id) };
				user ? axiosInstance.post(userHistoryUrl, payload) : null;
			}
		} catch (e) {
			console.error('error: Maybe unauthenticated user');
			console.error(e);
		}

		// return;
	};
	console.log(hasServerToken);
	return (
		<div className='d-flex '>
			<div className={styles.playIconContainer}>
				<Image
					src='/assets/playIcon.png'
					width={'100'}
					height={'100'}
					alt='First slide'
					className={
						hasLiveUrl
							? styles.playIconWithFullOpacity
							: styles.playIconWithLessOpacity
					}
					onClick={handlePlayIconClick}
				/>
				{type ? (
					<span className={styles.paidevent}>Paid Event</span>
				) : (
					<span className={styles.freeevent}>Free Event</span>
				)}
			</div>
			{hasServerToken
				? isFavourite(user, event, userFav, handleHeartClick)
				: null}
		</div>
	);
};

const isFavourite = (user, event, userFav, handleHeartClick) => {
	if (!userFav)
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
};

const Divider = () => {
	return <div className={styles.divider} />;
};
