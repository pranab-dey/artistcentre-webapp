import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Caption, CustomButton, CustomForm, Divider } from 'components';

import { loginForm } from './loginForm';
import { registerForm } from './registerForm';

// import { useAuth } from 'context/auth';

import { validationSchema } from './validationSchema';
import { registerUrl, loginUrl } from 'constant/apiResources';

function LoginWithEmail(props) {
	const { hideModal, setSession } = props;
	const router = useRouter();

	const initState = {
		email: '',
		password: '',
	};
	const [initialValues, setInitialValues] = useState(initState);
	const [isLogin, setIsLogin] = useState(true);
	const [state, setState] = useState('');

	const handleClick = (e) => {
		setIsLogin((prevState) => !prevState);
		setState('');
		setInitialValues(initState);
	};

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
			// console.log(values);
			if (isLogin) {
				const { data } = await axios.post(loginUrl, values, {
					headers: {},
				});
				localStorage.setItem('user', JSON.stringify(data));
				setState('');
				hideModal();
			} else {
				const resJson = await axios.post(registerUrl, values);
				setState('Registration Successful.');
				setIsLogin((prevState) => !prevState);
			}
		} catch (err) {
			setState(
				err.response.data?.email?.[0] ||
					err.response.data?.password?.[0] ||
					'Unable to log in with provided credentials.'
			);
			// console.log(err.response.data);
		}

		setInitialValues(null);
		setSession(JSON.parse(localStorage.getItem('user'))?.token || '');
	};

	const onError = (error) => {
		// console.log('$$ Form Submit ERROR::', error);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<Row>
				{isLogin
					? loginForm.map((item, index) => (
							<CustomForm
								item={item}
								register={register}
								errors={errors}
								key={index}
							/>
					  ))
					: registerForm.map((item, index) => (
							<CustomForm
								item={item}
								register={register}
								errors={errors}
								key={index}
							/>
					  ))}
				<Col xs={12} style={{ padding: '0px 30px' }}>
					{state ? (
						<div style={errorText}>
							<span
								style={
									state.includes('Successful')
										? { color: 'green', fontWeight: '500' }
										: { color: 'red' }
								}>
								{state}
							</span>
						</div>
					) : null}
					<CustomButton
						btnText={isLogin ? 'Sign in' : 'Sign up'}
						type='submit'
						customStyle={{
							marginTop: '15px',
							fontWeight: '500',
							fontFamily: 'Poppins',
						}}
					/>
				</Col>
				<Col xs={12}>
					<Caption
						text={
							isLogin
								? "Don't have an account?"
								: 'Already have an account?'
						}
						linkText={isLogin ? 'Register!' : 'Sign in'}
						clickHandler={handleClick}
					/>
				</Col>
				<Col xs={12}>
					<Divider />
				</Col>
			</Row>
		</Form>
	);
}

const errorText = {
	fontSize: '13px',
	marginTop: '3px',
	textAlign: 'center',
};

export default LoginWithEmail;
