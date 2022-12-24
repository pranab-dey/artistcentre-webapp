import { deleteCookie } from 'cookies-next';

const handler = async (req, res) => {
	try {
		deleteCookie('token', { req, res });
		return res.status(200).json({ message: 'OK' });
	} catch (error) {
		// return errorHandler(res, error);
		console.log('error in server:: ', error);
	}
};

export default handler;
