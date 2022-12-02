import axios from 'axios';

const axiosInstance = axios.create({
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const user = localStorage.getItem('user');
		const session = user ? JSON.parse(user)?.token : {};

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

axiosInstance.interceptors.response.use(
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

			return axiosInstance(config);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
