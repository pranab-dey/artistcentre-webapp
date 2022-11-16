import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { FiLogIn } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';

import { CustomButton, AppModal } from 'components';

import Search from './search';

import classes from './header.module.scss';

function MainHeader(props) {
	const [modalShow, setModalShow] = useState(false);

	const { darkTheme, themeToggle } = props;

	return (
		<Container fluid='xs' className={`${classes.mainHeader}`}>
			<Container className={classes.header}>
				<Row className={classes.headerRow}>
					<Col xs={5} md={3}>
						<div className={`${classes.logo} mt-4`}>
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
					<Col xs={1} md={4}>
						<Search />
					</Col>
					<Col xs={6} md={5}>
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
							<CustomButton
								btnText='Login'
								variant='primary'
								type='button'
								icon={FiLogIn}
								customStyle={{
									fontWeight: '500',
									fontFamily: 'Poppins, Roboto, sans-serif',
									width: '120px',
									fontSize: '14px',
								}}
								onClick={() => setModalShow((prev) => !prev)}
							/>
							<AppModal
								modalShow={modalShow}
								onHide={() => setModalShow(false)}
							/>
						</div>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default MainHeader;
