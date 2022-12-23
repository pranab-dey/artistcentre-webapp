import axios from 'axios';
import AppLocalStorage from 'pages/api/appLocalStorage';

const axiosServerInstance = axios.create({
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosServerInstance.interceptors.request.use(
	async (config) => {
		// let user;
		// if (localStorage) {
		// 	user = localStorage?.getItem('user');
		// }
		// const clientsession = user ? JSON.parse(user)?.token : {};
		const serverSession = AppLocalStorage.getItem('user')?.token;

		console.log(serverSession);

		const session = serverSession;

		if (session) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${session}`,
			};
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosServerInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.error(error);
		const config = error?.config;

		if (error?.response?.status === 401 && !config?.sent) {
			config.sent = true;

			// const { session } = await memoizedRefreshToken();

			// if (session) {
			// 	config.headers = {
			// 		...config.headers,
			// 		Authorization: `Bearer ${session}`,
			// 	};
			// }

			return axiosServerInstance(config);
		}
		return Promise.reject(error);
	}
);

export default axiosServerInstance;
