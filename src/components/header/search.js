import Image from 'next/image';
import { useState } from 'react';

import styles from './header.module.scss';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import Calender from './calender';

function Search(props) {
	const router = useRouter();
	const [searchText, setSearchText] = useState('');
	const [showSearchInput, setSearchInput] = useState(false);

	const handleSearchIconClick = () => {
		setSearchInput((prev) => !prev);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			router.push(
				{
					pathname: '/search',
					query: { searchText },
				},
				'/search'
			);
			setSearchText('');
		}
	};

	return (
		<div className={`${styles.search} mt-0`}>
			<div className={styles.searchInputWrapper}>
				<input
					className={
						showSearchInput
							? `${styles.searchInput}`
							: `${styles.displayNone}`
					}
					placeholder='search'
					id='searchbar'
					value={searchText}
					onChange={(event) => setSearchText(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<BsSearch
					className={styles.searchIcon}
					onClick={handleSearchIconClick}
				/>
			</div>
			{/* <h6 className={styles.margin}>Select Date</h6>
			<div
				className={styles.calenderIcon}
				onClick={handleCalenderClicked}>
				<Image
					src='/assets/calendar-week.png'
					width={100}
					height={100}
				/>
			</div> */}
			<Calender />
		</div>
	);
}

export default Search;
