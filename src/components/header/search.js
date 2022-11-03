// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import Image from 'next/image';

// import { CustomButton } from 'components';
// import { FiLogIn } from 'react-icons/fi';

import styles from './header.module.scss';

function Search() {
	return (
		<div className={`${styles.search} mt-4`}>
			<InputGroup className={`${styles.seachbar} `}>
				<Form.Control placeholder='search' aria-label='search' />
				{/* <BsSearch className={styles.searchIcon} /> */}
				{/* <Button
					variant='transparent'
					style={{
						background: 'none',
						position: 'absolute',
						top: '0',
						right: '-20',
					}}>
					<BsSearch />
				</Button> */}
			</InputGroup>
			<h6 className={styles.margin}>Select Date</h6>
			<Image src='/assets/calendar-week.png' width={20} height={20} />
		</div>
	);
	// return (
	// 	<Navbar expand='lg' fixed='top' style={{ border: '1px solid red' }}>
	// 		<Container>
	// 			<Image
	// 				src='/assets/logo.png'
	// 				width='40'
	// 				height='40'
	// 				className='d-inline-block align-top'
	// 				alt='logo'
	// 			/>
	// 			<Navbar.Brand href='#' className={`${styles.logoText} mx-2`}>
	// 				ArtistStream
	// 			</Navbar.Brand>
	// 			{/* <Navbar.Toggle aria-controls='navbarScroll' /> */}
	// 			{/* <Navbar.Collapse id='navbarScroll'> */}
	// 			<Nav
	// 				className='me-auto my-2 my-lg-0'
	// 				style={{ maxHeight: '100px', border: '1px solid green' }}
	// 				navbarScroll>
	// 				{/* <Nav.Link href='#action1'>LogIn</Nav.Link> */}

	// 				{/* <NavDropdown title='Link' id='navbarScrollingDropdown'>
	// 					<NavDropdown.Item href='#action3'>
	// 						Action
	// 					</NavDropdown.Item>
	// 					<NavDropdown.Item href='#action4'>
	// 						Another action
	// 					</NavDropdown.Item>
	// 					<NavDropdown.Divider />
	// 					<NavDropdown.Item href='#action5'>
	// 						Something else here
	// 					</NavDropdown.Item>
	// 				</NavDropdown> */}
	// 				{/* <Form className='d-flex'>
	// 					<Form.Control
	// 						type='search'
	// 						placeholder='Search'
	// 						className='me-2'
	// 						aria-label='Search'
	// 					/>
	// 					<Button variant='outline-success'>Search</Button>
	// 				</Form>
	// 				<CustomButton
	// 					btnText='Login'
	// 					variant='primary'
	// 					type='button'
	// 					icon={FiLogIn}
	// 					customStyle={{
	// 						fontWeight: '500',
	// 						fontFamily: 'Poppins, Roboto, sans-serif',
	// 					}}
	// 					// onClick={LikeOnClick}
	// 				/>
	// 			*/}
	// 			</Nav>
	// 			{/* </Navbar.Collapse> */}
	// 		</Container>
	// 	</Navbar>
	// );
}

export default Search;
