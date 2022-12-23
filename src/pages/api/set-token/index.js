import { setCookie } from 'cookies-next';

const handler = async (req, res) => {
	try {
		const clientToken = req.headers.authorization;
		console.log('client Token', clientToken);

		setCookie('token', clientToken, { req, res, maxAge: 2147483647 });

		return res.status(200).json({ message: 'OK' });
	} catch (error) {
		// return errorHandler(res, error);
		console.log('error in server:: ', error);
	}
};

export default handler;
