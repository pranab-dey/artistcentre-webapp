import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRegEdit } from 'react-icons/fa';
import { ImMobile } from 'react-icons/im';

import { CustomButton } from 'components';

import styles from './edit.module.scss';

export default function EditProfile() {
	return (
		<Container fluid className={styles.container}>
			<Row className='p-2 pt-4 gy-3'>
				<Col xs={12} md={6}>
					<div className={styles.title}>
						<span>Edit Profile</span>
					</div>
					<div className={styles.inputBox}>
						<input
							type='text'
							className={styles.input}
							placeholder={'Name'}
						/>
						<FaRegEdit className={styles.editIcon} />
					</div>
					<div className={styles.inputBox}>
						<input
							type='text'
							className={styles.input}
							placeholder={'sample@email.com'}
						/>
						<FaRegEdit className={styles.editIcon} />
					</div>
				</Col>
				<Col xs={12} md={6}>
					<div className={styles.title}>
						<span>Change Number</span>
					</div>

					<div className={styles.mobileContainer}>
						<div className={styles.phoneBoxOne}>
							<input
								type='number'
								className={styles.numberinput}
								placeholder={'+880'}
							/>
						</div>
						<div className={styles.phoneBoxTwo}>
							<input
								type='number'
								className={styles.input}
								placeholder={'123456789'}
							/>
							<ImMobile className={styles.mobileIcon} />
						</div>
					</div>
				</Col>
			</Row>
			<Row className='p-2 pt-2 gy-3'>
				<Col xs={12} md={4}>
					<CustomButton
						btnText='Submit'
						variant='primary'
						type='button'
						customStyle={{
							fontWeight: '500',
							fontFamily: 'Poppins, Roboto, sans-serif',
							width: '120px',
							fontSize: '14px',
							width: '45%',
						}}
					/>
				</Col>
			</Row>
		</Container>
	);
}
