import { Description } from 'components';
import { useSearch } from 'appStore/context/search';

export default function DescriptionContainer({ topEvent }) {
	const { user } = useSearch();

	return (
		<div style={padding}>
			<Description topEvent={topEvent} user={user} />
		</div>
	);
}

const padding = {
	paddingBottom: '10px',
	marginTop: '12px',
};
