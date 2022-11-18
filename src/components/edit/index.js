import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRegEdit } from 'react-icons/fa';
import { ImMobile } from 'react-icons/im';

import { CustomButton } from 'components';
import { useState } from 'react';

import styles from './edit.module.scss';

export default function EditProfile(props) {
	const { data, handleProfileEditSubmit } = props;

	const initialData = {
		first_name: data.first_name ?? undefined,
		email: data.email ?? undefined,
		mobileV1: data.artist_mobile?.slice(0, 4) ?? undefined,
		mobileV2: data.artist_mobile?.slice(4) ?? undefined,
	};
	const [userEditedData, setUserEditedData] = useState(initialData);

	const handleInputChange = (e) => {
		e.preventDefault();
		let value = e.target.value;

		setUserEditedData((prev) => {
			return {
				...prev,
				[e.target.name]: value,
			};
		});
	};

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
							name='first_name'
							value={userEditedData.first_name}
							onChange={handleInputChange}
						/>
						<FaRegEdit className={styles.editIcon} />
					</div>
					<div className={styles.inputBox}>
						<input
							type='text'
							className={styles.input}
							placeholder={'sample@email.com'}
							name='email'
							value={userEditedData.email}
							onChange={handleInputChange}
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
								type='text'
								className={styles.numberinput}
								placeholder={'+880'}
								name='mobileV1'
								value={userEditedData.mobileV1}
								onChange={handleInputChange}
								maxLength={4}
							/>
						</div>
						<div className={styles.phoneBoxTwo}>
							<input
								type='text'
								className={styles.input}
								placeholder={'123456789'}
								name='mobileV2'
								value={userEditedData.mobileV2}
								onChange={handleInputChange}
								maxLength={10}
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
						onClick={() => handleProfileEditSubmit(userEditedData)}
					/>
				</Col>
			</Row>
		</Container>
	);
}
