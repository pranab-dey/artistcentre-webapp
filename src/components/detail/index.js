import styles from './detail.module.scss';
import { GrLocation } from 'react-icons/gr';
import { MdOutlineWifiCalling3, MdWeb } from 'react-icons/md';
import { FiFacebook } from 'react-icons/fi';
import { TfiFacebook } from 'react-icons/tfi';

import { BsYoutube } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';

export default function Detail(props) {
	const { name, genre, address, mobile, web, fb, insta, yt } = props;

	return (
		<div className={styles.container}>
			<Title {...{ name, genre }} />
			<Location {...{ address }} />
			<Contact {...{ mobile }} />
			<Website {...{ web }} />
			<SocialGroup {...{ fb, insta, yt }} />
		</div>
	);
}

const Title = ({ name, genre = 'Jazz' }) => {
	return (
		<div className={styles.titleContainer}>
			<span className={styles.title}>{name}</span>

			{genre ? (
				<span className={styles.genre}>Genre - {genre}</span>
			) : null}
		</div>
	);
};

const Location = ({ address }) => {
	return (
		<>
			{address ? (
				<>
					<hr className={styles.divider} />
					<div className='d-flex'>
						<GrLocation className={styles.locationIcon} />
						<span className={styles.address}>{address}</span>
					</div>
				</>
			) : null}
		</>
	);
};

const Contact = ({ mobile }) => {
	return (
		<>
			{mobile ? (
				<>
					<hr className={styles.divider} />
					<div className='d-flex'>
						<MdOutlineWifiCalling3
							className={styles.locationIcon}
						/>
						<span className={styles.phonenumber}>
							+49-123456789
						</span>
					</div>
				</>
			) : null}
		</>
	);
};

const Website = ({ web }) => {
	return (
		<>
			{web ? (
				<>
					<hr className={styles.divider} />
					<div className='d-flex'>
						<MdWeb className={styles.locationIcon} />
						<span className={styles.website}>www.sample.com</span>
					</div>
				</>
			) : null}
		</>
	);
};

const SocialGroup = ({ fb, yt, insta }) => {
	return (
		<>
			<hr className={styles.divider} />

			<div className={styles.social}>
				<span className={styles.socialText}>Social Media</span>
				<div className={styles.socialContainer}>
					<div className={styles.fbWrapper}>
						<TfiFacebook className={styles.fbicon} />
					</div>
					<div className={styles.ytWrapper}>
						<BsYoutube className={styles.yticon} />
					</div>
					<div className={styles.instaWrapper}>
						<FaInstagramSquare className={styles.instaicon} />
					</div>
				</div>
			</div>
		</>
	);
};
