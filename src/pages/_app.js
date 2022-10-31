import Head from 'next/head';
import RootLayout from 'layout';

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
// import SwiperCore, { Pagination } from 'swiper/core';

// SwiperCore.use([Pagination]);

import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<RootLayout>
			<Head>
				<title>Artist Centre</title>
				<meta name='description' content='Artist Centre' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Component {...pageProps} />
		</RootLayout>
	);
}

export default MyApp;
