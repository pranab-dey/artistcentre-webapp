import Document, { Html, Head, Main, NextScript } from 'next/document';

function setInitialColorMode() {
	function getInitialColorMode() {
		const preference = window.localStorage.getItem('theme');
		const hasExplicitPreference = typeof preference === 'string';
		/**
		 * If the user has explicitly chosen light or dark,
		 * use it. Otherwise, this value will be null.
		 */
		if (hasExplicitPreference) {
			return preference;
		}
		// If there is no saved preference, use a media query
		const mediaQuery = '(prefers-color-scheme: dark)';
		const mql = window.matchMedia(mediaQuery);
		const hasImplicitPreference = typeof mql.matches === 'boolean';
		if (hasImplicitPreference) {
			return mql.matches ? 'dark' : 'light';
		}
		// default to 'light'.
		return 'light';
	}
	const colorMode = getInitialColorMode();
	const root = document.documentElement;
	root.style.setProperty('--initial-color-mode', colorMode);
	// add HTML attribute if dark mode
	if (colorMode === 'dark')
		document.documentElement.setAttribute('data-theme', 'dark');
}
// this function needs to be a string
const blockingSetInitialColorMode = `(function() {
		${setInitialColorMode.toString()}
		setInitialColorMode();
})()
`;
export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='google' content='notranslate' />
					<meta content='yes' name='apple-mobile-web-app-capable' />
					<meta
						name='apple-mobile-web-app-title'
						content='Artist Centre Web App'
					/>
					<meta
						name='apple-mobile-web-app-title'
						content='Artist Centre'
					/>
					<meta
						name='apple-mobile-web-app-status-bar-style'
						content='default'
					/>
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='mobile-web-app-capable' content='yes' />
					<link rel='icon' href='/favicon.png' />
					<link rel='shortcut icon' href='/favicon.png' />
					<link rel='apple-touch-icon' href='/logo.png' />
					<link
						rel='preconnect'
						href='https://fonts.googleapis.com'
					/>
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='true'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&family=Roboto:wght@100;300;500&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<script
					dangerouslySetInnerHTML={{
						__html: blockingSetInitialColorMode,
					}}></script>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
