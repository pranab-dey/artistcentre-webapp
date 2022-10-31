import Containter from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GrLocation } from 'react-icons/gr';
import { CiCalendarDate } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';

import styles from './description.module.scss';

export default function Description() {
	return (
		<Containter className={styles.containter}>
			<Row>
				<Col
					className='d-flex flex-column justify-content-flex-start align-items-flex-start px-4'
					md={9}
					xs={9}>
					<Title />
					<Location />
				</Col>
				<Col md={3} xs={3} style={{ marginLeft: '0px' }}>
					<EventType />
				</Col>
			</Row>
			<Row className='px-3'>
				<Divider />
				<Duration />
			</Row>
		</Containter>
	);
}

const Title = () => {
	return (
		<>
			<h4 className={styles.title}>Mad love</h4>
			<div className={styles.subTitle}>
				<span className={styles.band}>Jonas Brothers</span>
				<span className={styles.hiphen}>|</span>
				<span className={styles.genre}>Genre - Jazz</span>
			</div>
		</>
	);
};

const Location = ({}) => {
	return (
		<div className='d-flex justify-content-flex-start align-items-center mt-2 mb-3'>
			<GrLocation className={styles.locationIcon} />
			<div className={styles.address}>
				<div className={styles.place}>The Yard</div>
				<div className={styles.road}>242 ST Manchester, UK</div>
			</div>
		</div>
	);
};

const Duration = ({}) => {
	return (
		<div className='d-flex gap-5'>
			<div className='d-flex justify-content-flex-start align-items-center'>
				<CiCalendarDate className={styles.calenderIcon} />
				<div className={styles.font}>
					<span>Aug 15, 2021</span>
					<span className={styles.hiphen}>-</span>
					<span>Aug 18, 2022</span>
				</div>
			</div>

			<div className='d-flex justify-content-flex-start align-items-center'>
				<IoTimeOutline className={styles.timeIcon} />
				<div className={styles.font}>
					<span>08:00 PM</span>
					<span className={styles.hiphen}>-</span>
					<span>12:00 PM</span>
				</div>
			</div>
		</div>
	);
};

const Divider = () => {
	return <hr className={styles.divider} />;
};

const EventType = () => {
	return (
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
	);
};
