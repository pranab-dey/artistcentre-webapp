import Col from 'react-bootstrap/Col';
import { Feed, CustomButton } from 'components';

export default function FeedContainer() {
	return (
		<div>
			<span style={title}>Livestreams</span>
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<Feed />
			<div style={{ paddingTop: '18px' }}>
				<CustomButton
					variant='secondary'
					btnText='Load More'
					customStyle={{
						color: 'var(--color-primary-accent)',
						fontFamily: 'Poppins',
						fontWeight: 'bold',
						fontSize: 'small',
						borderRadius: '12px',
						border: '1px solid var(--color-primary-accent)',
					}}
				/>
			</div>
		</div>
	);
}

const title = {
	fontSize: '16px',
	fontFamily: 'Roboto',
	fontWeight: 'bold',
	color: 'var(--color-primary-accent)',
};
