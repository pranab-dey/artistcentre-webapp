import Col from 'react-bootstrap/Col';
import { Description } from 'components';

export default function DescriptionContainer({ topEvent }) {
	return (
		<div style={padding}>
			<Description topEvent={topEvent} />
		</div>
	);
}

const padding = {
	paddingBottom: '10px',
};
