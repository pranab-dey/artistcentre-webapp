import Head from 'next/head';
import RootLayout from 'layout';

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
// import SwiperCore, { Pagination } from 'swiper/core';

// SwiperCore.use([Pagination]);

import { useThemeToggle } from 'hooks';
import { themeAtom } from 'appStore';
import { useHydrateAtoms } from 'jotai/utils';
import { useAtom } from 'jotai';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
	// const [darkTheme, themeToggle] = useThemeToggle();
	// const value = {
	// 	darkTheme,
	// 	themeToggle,
	// };

	// useHydrateAtoms([[themeAtom, { theme: darkTheme, toggle: themeToggle }]]);
	// const [{ dark, toggle }] = useAtom(themeAtom);
	// console.log({ dark, toggle });

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
			{/* {dark !== undefined && (
				<label>
					<input type='checkbox' checked={dark} onChange={toggle} />
					Dark
				</label>
			)} */}
			<Component {...pageProps} />
		</RootLayout>
	);
}

export default MyApp;
