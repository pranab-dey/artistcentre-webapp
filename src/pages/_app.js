import Head from 'next/head';
import Router from 'next/router';
import RootLayout from 'layout';
import NProgress from 'nprogress';
import SearchProvider from 'appStore/context/search';

import 'nprogress/nprogress.css';
import 'styles/globals.scss';

NProgress.configure({
	easing: 'ease',
	speed: 500,
	showSpinner: false,
	trickleRate: 0.02,
	trickleSpeed: 800,
	minimum: 0.25,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<RootLayout>
			<Head>
				<title>Artist Stream</title>
				<meta name='Artist Stream' content='Artist Stream' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<SearchProvider>
				<Component {...pageProps} />
			</SearchProvider>
		</RootLayout>
	);
}

export default MyApp;
