import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TfiFacebook } from 'react-icons/tfi';
import { BsYoutube } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';

import styles from 'components/detail/detail.module.scss';

export default function AdditionalStreamsContainer(props) {
	const { topEvent } = props;

	return (
		<Container style={container}>
			<Row>
				<Col md={12} xs={12}>
					<Streams event={topEvent} />
				</Col>
			</Row>
		</Container>
	);
}

const Streams = ({ event }) => {
	return (
		<div style={streamContainer}>
			<span>Additional Streams</span>
			<div style={buttonGroup}>
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
	);
};

const container = {
	marginTop: '20px',
	padding: '30px 20px',
	textAlign: 'start',
	display: 'flex',
};
const streamContainer = {
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	flexDirection: 'column',
	gap: '10px',
	lineHeight: '17px',
	fontFamily: 'Roboto',
	overflow: 'hidden',
	color: 'var(--color-primary-accent)',
	fontSize: '22px',
	letterSpacing: '0.1px',
	fontWeight: '400',
};
const buttonGroup = {
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	gap: '20px',
	fontSize: '10px',
	marginTop: '10px',
	marginBottom: '10px',
};
