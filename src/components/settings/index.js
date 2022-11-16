import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useState } from 'react';
import styles from './settings.module.scss';

export default function settings({ notiStatus }) {
	const [isNotiStatus, setNotiStatus] = useState(notiStatus);
	const handleClick = (e) => {
		e.preventDefault();
		setNotiStatus((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<span className={styles.title}>Change Picture</span>
			<div className={styles.customInput}>
				<input type='file' />
			</div>
			<div className={styles.divider}></div>
			<div className={styles.notification}>
				<span className={styles.noti}>Notifications</span>
				{isNotiStatus ? (
					<FaToggleOn
						className={styles.toggleIcon}
						onClick={handleClick}
					/>
				) : (
					<FaToggleOff
						className={styles.toggleIcon}
						onClick={handleClick}
					/>
				)}
			</div>
		</div>
	);
}
