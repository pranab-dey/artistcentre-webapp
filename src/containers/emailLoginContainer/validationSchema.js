import { validationTextFor } from 'helpers/utils';
import * as yup from 'yup';

export const validationSchema = yup
	.object()
	.shape({
		email: yup.string().email().required(validationTextFor('Email')),
		password: yup.string().min(8).required(validationTextFor('password')),
	})
	.required();
