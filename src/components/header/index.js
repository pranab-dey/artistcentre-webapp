import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiLogIn } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';

import { CustomButton, AppModal } from 'components';
import Search from './search';
import Dropdown from './dropdown';
import { useRouter } from 'next/router';
import { hasCookie } from 'cookies-next';

import classes from './header.module.scss';
import { Router } from 'next/router';

function MainHeader(props) {
	const [modalShow, setModalShow] = useState(false);
	const [session, setSession] = useState('');
	const [isCookie, setIsCookie] = useState(null);
	const has = hasCookie('token');

	// const { darkTheme, themeToggle } = props;
	const router = useRouter();

	useEffect(() => {
		setSession(JSON.parse(localStorage.getItem('user'))?.token || '');
		setIsCookie(has);
	}, [session, has]);

	return (
		<Container fluid='xs' className={`${classes.mainHeader}`}>
			<Container className={classes.header}>
				<Row className={classes.headerRow}>
					<Col
						xs={5}
						md={2}
						style={{ height: '100%' }}
						className='d-flex justify-content-flex-start align-items-center'>
						<div
							className={`${classes.logo} mt-0`}
							onClick={() => router.push('/')}>
							<div className={classes.figure}>
								<Image
									src={'/assets/logo.png'}
									alt=''
									title=''
									width={100}
									height={100}
									layout='responsive'
									objectFit='cover'
									className={classes.image}
								/>
							</div>
							<div className={`${classes.logoText}`}>
								<span>ArtistStream</span>
							</div>
						</div>
					</Col>
					<Col
						xs={4}
						md={5}
						style={{ height: '100%' }}
						className='d-flex justify-content-center align-items-center'>
						<Search />
						{/* 					
						// darkmode - disabled
						{darkTheme !== undefined && (
							<label>
								<input
									type='checkbox'
									checked={darkTheme}
									onChange={themeToggle}
									style={{ display: 'none' }}
								/>
								<MdDarkMode className={classes.themeToggle} />
							</label>
						)} */}
					</Col>
					<Col xs={3} md={5} style={{ height: '100%' }}>
						<div className={`${classes.last} mt-0`}>
							{session && isCookie ? (
								<>
									<div className={classes.profileContainer}>
										<div className={classes.iconWrapper}>
											<IoMdNotificationsOutline
												className={classes.personIcon}
												onClick={() =>
													router.push(
														'/notifications'
													)
												}
											/>
										</div>

										<div className={classes.iconWrapper}>
											<BsPerson
												className={classes.personIcon}
												onClick={() =>
													router.push('/profile')
												}
											/>
										</div>

										<div className={classes.profile}>
											<Title />
											<Dropdown setSession={setSession} />
										</div>
									</div>
								</>
							) : (
								<CustomButton
									btnText='Login'
									variant='primary'
									type='button'
									icon={FiLogIn}
									customStyle={{
										fontWeight: '500',
										fontFamily:
											'Poppins, Roboto, sans-serif',
										width: '120px',
										fontSize: '14px',
										marginTop: '7px',
									}}
									onClick={() =>
										setModalShow((prev) => !prev)
									}
								/>
							)}
							<AppModal
								modalShow={modalShow}
								onHide={() => setModalShow(false)}
								setSession={setSession}
							/>
						</div>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

const Title = () => {
	const name =
		JSON.parse(localStorage.getItem('user'))?.user?.first_name ||
		JSON.parse(localStorage.getItem('user'))?.user?.displayName ||
		'Mr.';
	const parsedName = name.split(' ')[0];
	return (
		<span style={{ fontSize: '14px', fontFamily: 'Poppins' }}>
			{parsedName}
		</span>
	);
};

export default MainHeader;
