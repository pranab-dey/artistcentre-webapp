const path = require('path');

const headers = async () => {
	return [
		{
			// Apply these headers to all routes in your application.
			source: '/(.*)',
			headers: [
				{
					key: 'X-Content-Type-Options',
					value: 'nosniff',
				},
				{
					key: 'X-Frame-Options',
					value: 'SAMEORIGIN',
				},
				{
					key: 'X-XSS-Protection',
					value: '1; mode=block',
				},
			],
		},
	];
};

const publicRuntimeConfig = {
	serviceBaseEndpoint: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL,
	internalApiUrl: process.env.NEXT_PUBLIC_REACT_APP_INTERNAL_API_BASE_URL,
};

const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	headers,
	eslint: { ignoreDuringBuilds: true },
	images: {
		domains: [
			'loremflickr.com',
			'newevolutiondesigns.com',
			'cloudflare-ipfs.com',
			'picsum.photos',
		],
	},
};

module.exports = nextConfig;
