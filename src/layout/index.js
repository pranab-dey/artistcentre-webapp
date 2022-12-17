import { MainHeader, Footer } from 'components';
import { useThemeToggle } from 'hooks';

import { useAtom } from 'jotai';
import { themeAtom } from 'appStore';
import { useHydrateAtoms } from 'jotai/utils';

import { useMemo } from 'react';

function Layout(props) {
	const [darkTheme, themeToggle] = useThemeToggle();

	return (
		<>
			<MainHeader {...{ darkTheme, themeToggle }} />
			<main>{props.children}</main>
			<Footer />
		</>
	);
}

export default Layout;
