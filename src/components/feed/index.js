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

export default function Feed() {
	return (
		<Containter className={styles.containter}>
			<div className={styles.layout}>
				<Photo />
				<Description />
				<EventType />
			</div>
			<Divider />
			<Location />
		</Containter>
	);
}

const Photo = () => {
	return (
		<div className={styles.imageContainer}>
			<Image
				src='https://picsum.photos/1920/1080?random=1'
				width={95}
				height={55}
				alt='First slide'
				className={styles.image}
			/>
		</div>
	);
};

const Location = () => {
	return (
		<div className={styles.locationContainer}>
			<SlLocationPin className={styles.locationIcon} />
			<div className={styles.address}>
				<div className={styles.place}>South East Park</div>
				<span className={styles.hiphen}>-</span>
				<div className={styles.date}>Aug 15, 2021</div>
			</div>
		</div>
	);
};

const Description = ({}) => {
	return (
		<div>
			<span className={styles.desc}>Perfect X</span>
			<div className='d-flex justify-content-center align-items-center'>
				<IoTimeOutline className={styles.timeIcon} />
				<div className={styles.timeFont}>
					<span>08:00 PM</span>
					<span className={styles.hiphen}>-</span>
					<span className={styles.time}>12:00 PM</span>
				</div>
			</div>
		</div>
	);
};

const EventType = ({}) => {
	return (
		<div className='d-flex'>
			<div className={styles.playIconContainer}>
				<Image
					src='/assets/playIcon.png'
					width={'40%'}
					height={'30%'}
					alt='First slide'
					className={styles.playIcon}
				/>
				<span>Paid Event</span>
			</div>
			<AiOutlineHeart className={styles.heartIcon} />
		</div>
	);
};

const Divider = () => {
	return <div className={styles.divider} />;
};
