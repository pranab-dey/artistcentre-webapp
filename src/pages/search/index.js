import { useEffect } from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from 'styles/Detail.module.scss';
import { SearchContainer, SearchLivestreamContainer } from 'containers';
import { AsyncSpinner } from 'components';

import { useSearch } from 'appStore/context/search';
import { useRouter } from 'next/router';

import styles from 'styles/Detail.module.scss';

export default function Search(props) {
	const {
		search,
		results,
		error,
		searchLoading,
		setSearchPayload,
		searchPayload,
	} = useSearch();

	const router = useRouter();
	const { searchText, event_date } = router.query;

	useEffect(() => {
		const getSearchData = async () => {
			await search({
				search: searchText ?? undefined,
				search_type: 'event',
				event_date: event_date ?? undefined,
			});
		};
		if (searchText || event_date) getSearchData();
	}, [searchText, event_date]);

	if (!results.length && !searchLoading) {
		return (
			<Container className={styles.searchMain}>
				<p className={styles.noresults}>No search results found!</p>
			</Container>
		);
	}

	if (searchLoading) {
		return (
			<AsyncSpinner />
			// <Container className={styles.searchMain}>
			// 	<p className={styles.noresults}>Loading...</p>
			// </Container>
		);
	}

	return (
		<>
			<Head>
				<title>Search | ArtistStream</title>
				<meta name='search' content='' />
			</Head>

			<main className={classes.bgColor}>
				<Container fluid='sm'>
					<Row>
						<Col
							className=''
							xs={{ span: 12, order: 1 }}
							md={{ span: 8, order: 1 }}>
							<SearchContainer detail={results} limit={4} />
						</Col>
						<Col
							xs={{ span: 12, order: 2 }}
							md={{ span: 4, order: 1 }}>
							<SearchLivestreamContainer detail={results} />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
