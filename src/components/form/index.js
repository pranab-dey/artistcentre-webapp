import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import styles from './form.module.scss';

import { capitalizeFirstLetter } from 'helpers/utils';

function CustomForm({ item, register, errors }) {
	const {
		key,
		controlId,
		type,
		min,
		placeholder,
		label,
		xs,
		md,
		errorMsg,
		autoFocus,
	} = item;

	return (
		<Col xs={xs} md={md} key={item.key}>
			<Form.Group className='mb-2' controlId={controlId}>
				{item.title && (
					<Form.Label className={styles.title}>
						{item.title}
					</Form.Label>
				)}

				{type === 'textarea' && (
					<Form.Control
						as='textarea'
						rows='3'
						className='rounded-1 shadow-none border border-dark bg-white'
						placeholder={placeholder}
						{...register(key)}
					/>
				)}

				{type === 'checkbox' ? (
					<Form.Check
						className='mb-1'
						type={type}
						label={label}
						{...register(key)}
					/>
				) : (
					<Form.Control
						className='mb-1 p-2'
						type={type}
						min={min}
						placeholder={placeholder}
						autoFocus={autoFocus}
						{...register(key)}
					/>
				)}
				{errors[key] && (
					<Form.Text
						className='text-danger'
						style={{ fontSize: '12px' }}>
						{errorMsg
							? capitalizeFirstLetter(errorMsg)
							: capitalizeFirstLetter(errors[key].message)}
					</Form.Text>
				)}
			</Form.Group>
		</Col>
	);
}

export default CustomForm;
