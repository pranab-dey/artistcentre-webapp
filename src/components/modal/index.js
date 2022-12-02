import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { LoginWithEmail } from 'containers';

import { FcGoogle } from 'react-icons/fc';
import { FiFacebook } from 'react-icons/fi';

import styles from './modal.module.scss';

export default function AppModal(props) {
	const { modalShow, onHide, setSession } = props;

	return (
		<Modal
			size='md'
			show={modalShow}
			aria-labelledby='contained-modal-title-vcenter'
			centered
			onHide={onHide}
			dialogClassName={styles.customModal}
			contentClassName={styles.modalHeight}>
			<Modal.Body className={styles.modal}>
				<Container fluid='xs' className='mt-3 mb-3'>
					<Row>
						<Col xs={12} md={12}>
							<LoginHeader />
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12}>
							<OauthLogInGroup />
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12}>
							<LoginWithEmail
								hideModal={onHide}
								setSession={setSession}
							/>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}

const LoginHeader = () => {
	return (
		<div className={styles.loginContainer}>
			<span className={styles.logintext}>Login</span>
			<div className={styles.logoContainer}>
				<div className={styles.imageContainer}>
					<Image
						src={'/assets/logo.png'}
						alt=''
						title=''
						width={70}
						height={70}
						layout='responsive'
						objectFit='cover'
						className={styles.image}
					/>
				</div>
				<span className={styles.logotext}>ArtistStream</span>
			</div>
		</div>
	);
};
const OauthLogInGroup = () => {
	return (
		<div className={styles.container}>
			<div className={styles.buttonGroup}>
				<div className={styles.imgWrapper}>
					<FcGoogle className={styles.icon} />
				</div>
				<div className={styles.imgWrapper}>
					<FiFacebook className={styles.fbicon} />
				</div>
			</div>
			<div>
				<span className={styles.withemail}>or Login with Email</span>
			</div>
		</div>
	);
};
