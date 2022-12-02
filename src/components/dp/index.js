import Image from 'next/image';

import styles from './dp.module.scss';

export default function DisplayPicture(props) {
	const { data } = props;

	return (
		<div className={styles.dpContainer}>
			<div className={styles.imageContainer}>
				<Image
					src={
						data.profile_picture ||
						data.artist_image ||
						'/assets/no-image.jpeg'
					}
					alt=''
					title=''
					width={400}
					height={400}
					layout='responsive'
					objectFit='cover'
					className={styles.image}
				/>
			</div>

			{data.first_name ? (
				<span className={styles.name}>
					{data.first_name} {data.last_name}
				</span>
			) : null}

			{data.email ? (
				<span className={styles.email}>{data.email}</span>
			) : null}

			{data.artist_mobile ? (
				<span className={styles.number}>{data.artist_mobile}</span>
			) : null}
		</div>
	);
}
