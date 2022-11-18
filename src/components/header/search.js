import Image from 'next/image';
import { useState } from 'react';

import styles from './header.module.scss';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';

function Search(props) {
	const router = useRouter();

	const [searchText, setSearchText] = useState('');

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			router.push(
				{
					pathname: '/search',
					query: { searchText },
				},
				'/search'
			);
		}
	};

	return (
		<div className={`${styles.search} mt-4`}>
			<div className={styles.searchInputWrapper}>
				<input
					className={`${styles.searchInput} `}
					placeholder='search'
					id='searchbar'
					onChange={(event) => setSearchText(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<BsSearch className={styles.searchIcon} />
			</div>
			<h6 className={styles.margin}>Select Date</h6>
			<div className={styles.calenderIcon}>
				<Image
					src='/assets/calendar-week.png'
					width={100}
					height={100}
				/>
			</div>
		</div>
	);
}

export default Search;
