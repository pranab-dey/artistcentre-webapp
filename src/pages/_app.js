import Head from 'next/head';
import RootLayout from 'layout';
import SearchProvider from 'appStore/context/search';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<RootLayout>
			<Head>
				<title>Artist Stream</title>
				<meta name='description' content='Artist Stream' />
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
