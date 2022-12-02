import { searchUrl } from 'constant/apiResources';
import axios from 'axios';
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

const SearchContext = createContext();

export default function SearchProvider({ children }) {
	const [error, setError] = useState(null);
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchPayload, setSearchPayload] = useState();
	const [results, setResults] = useState([]);

	const search = useCallback(async (payload) => {
		const session = JSON.parse(localStorage.getItem('user'))?.token || '';

		setSearchLoading(true);
		try {
			const response = await axios({
				method: 'POST',
				url: searchUrl,
				data: payload,
				headers: {
					Authorization: `Bearer ${session}`,
					'Content-Type': 'application/json',
				},
			});
			// console.log(response);

			setResults(response.data.data);
			setSearchLoading(false);
		} catch (error) {
			console.error(error);
			setSearchLoading(false);
			setError(error);
		}
	}, []);

	const contextValue = useMemo(() => {
		return {
			results,
			error,
			searchLoading,
			searchPayload,
			setSearchPayload,
			search,
		};
	}, [results, searchLoading, error]);

	return (
		<SearchContext.Provider value={contextValue}>
			{children}
		</SearchContext.Provider>
	);
}

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
