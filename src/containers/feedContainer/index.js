import Col from 'react-bootstrap/Col';
import { Feed, CustomButton } from 'components';
import { useState } from 'react';

export default function FeedContainer({ liveStreams }) {
	const [loadMore, setLoadMore] = useState(false);

	return (
		<div>
			<span style={title}>Livestreams</span>
			<div style={{ overflow: 'hidden' }}>
				<div
					style={{
						overflowY: 'scroll',
						height: '242vh',
						paddingRight: '17px',
						boxSizing: 'content-box',
					}}>
					{/* {liveStreams.map((liveStream) => (
						<Feed event={liveStream} />
					))}
					{liveStreams.slice(0, 2).map((liveStream) => (
						<Feed event={liveStream} />
					))} */}
					{liveStreams.map((liveStream) => (
						<Feed event={liveStream} key={liveStream.id} />
					))}
					{loadMore &&
						liveStreams.map((liveStream) => (
							<Feed event={liveStream} />
						))}
				</div>
			</div>
			{liveStreams.length > 14 ? (
				<div>
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
						onClick={(e) => setLoadMore(true)}
					/>
				</div>
			) : null}
		</div>
	);
}

const title = {
	fontSize: '16px',
	fontFamily: 'Roboto',
	fontWeight: 'bold',
	color: 'var(--color-primary-accent)',
};
