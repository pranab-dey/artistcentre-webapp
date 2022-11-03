import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { TbBrandTelegram } from 'react-icons/tb';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { Caption, CustomButton, CustomForm, Divider } from 'components';

import { loginForm } from './loginForm';

// import { useAuth } from 'context/auth';

import { validationSchema } from './validationSchema';

function LoginWithEmail() {
	const router = useRouter();
	// const { login } = useAuth();

	const initState = {
		email: '',
		password: '',
		rememberme: false,
	};
	const [initialValues, setInitialValues] = useState(initState);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: initialValues,
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (values) => {
		try {
			// await login(values);
			// router.push('/newsfeed');
		} catch (err) {
			console.log({ err });
		}
		setInitialValues(null);
	};

	const onError = (error) => {
		// console.log('$$ Form Submit ERROR::', error);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<Row>
				{loginForm.map((item, index) => (
					<CustomForm
						item={item}
						register={register}
						errors={errors}
						key={index}
					/>
				))}
				<Col xs={12}>
					<CustomButton
						btnText='Sign In'
						type='submit'
						// icon={TbBrandTelegram}
						customStyle={{
							marginTop: '15px',
							fontWeight: '500',
							fontFamily: 'Poppins',
						}}
					/>
				</Col>
				<Col xs={12}>
					<Caption
						text="Don't have an acoount?"
						linkText='Register!'
						href='/forgot-password'
					/>
				</Col>
				<Col xs={12}>
					<Divider />
				</Col>
			</Row>
		</Form>
	);
}

export default LoginWithEmail;
