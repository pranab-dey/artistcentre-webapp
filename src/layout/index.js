import { MainHeader, Footer } from 'components';

function Layout(props) {
	return (
		<>
			<MainHeader />
			<main>{props.children}</main>
			<Footer />
		</>
	);
}

export default Layout;
