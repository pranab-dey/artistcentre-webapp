import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { LoginWithEmail } from 'containers';
// import { useFirebaseAuth } from 'appStore/context/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from 'constant/firebase';
import { useRouter } from 'next/router';
// import AppLocalStorage from 'pages/api/appLocalStorage';
// import { setCookie } from 'cookies-next';

import axiosInstance from 'constant/axios';
import axios from 'axios';
import { googleLoginUrl } from 'constant/apiResources';

import { FcGoogle } from 'react-icons/fc';
import { FiFacebook } from 'react-icons/fi';

import styles from './modal.module.scss';

export default function AppModal(props) {
	const { modalShow, onHide, setSession } = props;
	const router = useRouter();

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
							<OauthLogInGroup
								onHide={onHide}
								setSession={setSession}
								// setUserData={setUser}
							/>
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
const OauthLogInGroup = ({ setSession, setUserData, onHide }) => {
	const [user, setUser] = useAuthState(firebaseAuth);
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		console.log('user', user);
		// user ? setUserData() : null;
		// do
	}, [user]);

	const googleLogin = async () => {
		// console.log('login');
		try {
			const result = await signInWithPopup(firebaseAuth, provider);
			// console.log({ result });

			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const credToken = credential?.accessToken;

			// The signed-in user info.
			const googleUser = result.user;
			// const token = result?.user?.accessToken ?? credToken;

			// send token to backend
			const {
				data: { token, user: backendUser },
				status,
			} = await axios.post(googleLoginUrl, {
				access_token: credToken,
			});

			if (status === 200) {
				const userData = {
					token,
					user: backendUser ?? googleUser,
				};

				localStorage.setItem('user', JSON.stringify(userData));
				setSession(token);
				// setCookie('token', token);
				const res = await axiosInstance.get('api/set-token');
				console.log(res);
				router.replace(router.asPath);

				// AppLocalStorage.setItem('user', userData);
				// document.cookie = `token=${token}; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
			}

			// setUserData?.(userData);

			//setUser(true);
			// console.log({ credential, token, user });
		} catch (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			//setUser(false);
			console.log({ errorCode, errorMessage, email, credential });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.buttonGroup}>
				<div
					className={styles.imgWrapper}
					onClick={() => {
						console.log('login');
						onHide();
						googleLogin();
					}}>
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
