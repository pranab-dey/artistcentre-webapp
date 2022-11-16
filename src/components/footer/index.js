import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { TfiFacebook } from 'react-icons/tfi';
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { RiTwitterFill } from 'react-icons/ri';

import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
	return (
		<Container fluid='xs' className={`${styles.container} p-4`}>
			<Container className={styles.mainContainer}>
				<div className={styles.footerStart}>
					<span>About</span>
					<span className={styles.div}>|</span>
					<span>Newsletter</span>
					<span className={styles.div}>|</span>
					<span>Contact</span>
				</div>
				<hr />
				<div className={styles.footerEnd}>
					<span> &#169; Copyright 2022 - ArtistStream</span>
					<div className={styles.iconGroup}>
						<TfiFacebook />
						<FaLinkedinIn />
						<RiTwitterFill />
						<FaYoutube />
					</div>
				</div>
			</Container>
		</Container>
	);
}
