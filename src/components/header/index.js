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

import classes from './header.module.scss';
import { Router } from 'next/router';

function MainHeader(props) {
	const [modalShow, setModalShow] = useState(false);
	const [session, setSession] = useState('');

	const { darkTheme, themeToggle } = props;
	const router = useRouter();

	useEffect(() => {
		setSession(JSON.parse(localStorage.getItem('user'))?.token || '');
	}, [session]);

	return (
		<Container fluid='xs' className={`${classes.mainHeader}`}>
			<Container className={classes.header}>
				<Row className={classes.headerRow}>
					<Col xs={5} md={3}>
						<div
							className={`${classes.logo} mt-4`}
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
					<Col xs={5} md={4}>
						<Search />
					</Col>
					<Col xs={2} md={5}>
						<div className={`${classes.last} mt-4 `}>
							{darkTheme !== undefined && (
								<label>
									<input
										type='checkbox'
										checked={darkTheme}
										onChange={themeToggle}
										style={{ display: 'none' }}
									/>
									<MdDarkMode
										className={classes.themeToggle}
									/>
								</label>
							)}
							{session ? (
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
		JSON.parse(localStorage.getItem('user'))?.user.first_name ||
		JSON.parse(localStorage.getItem('user'))?.user.displayName;
	const parsedName = name.split(' ')[0];
	return (
		<div style={{ fontSize: '14px', fontFamily: 'Poppins' }}>
			<span>{parsedName}</span>
		</div>
	);
};

export default MainHeader;
