import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { FiLogIn } from 'react-icons/fi';

import { CustomButton } from 'components';

import Search from './search';

import classes from './header.module.scss';

function MainHeader() {
	return (
		<Container fluid className={`${classes.mainHeader}`}>
			<Container fluid='md' className={classes.header}>
				<Row className={classes.headerRow}>
					<Col xs={3}>
						<div className={`${classes.logo} mt-4`}>
							<figure className={classes.figure}>
								<Image
									width='100%'
									height='100%'
									src={'/assets/logo.png'}
									alt={'logo'}
								/>
							</figure>
							<div className={`${classes.logoText}`}>
								<span>ArtistStream</span>
							</div>
						</div>
					</Col>
					<Col xs={4}>
						<Search />
						{/* <Form className='d-flex mt-4'>
							<Form.Control
								type='search'
								placeholder='Search'
								className='me-2'
								aria-label='Search'
							/>
							<Button variant='outline-success'>Search</Button>
						</Form> */}
					</Col>
					<Col xs={5}>
						<div className={`${classes.last} mt-4 `}>
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
								// onClick={LikeOnClick}
							/>
						</div>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default MainHeader;
