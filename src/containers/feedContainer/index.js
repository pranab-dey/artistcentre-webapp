import { Feed, CustomButton } from 'components';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function FeedContainer({ liveStreams, height, limit }) {
	const router = useRouter();
	const [loadMore, setLoadMore] = useState(false);
	const getWidth = () => {
		if (router.pathname === '/') return '760px';
		return '570px';
	};
	const getNextWidth = () => {
		if (router.pathname === '/') return '750px';
		return '540px';
	};

	return (
		<div>
			{liveStreams.length ? <span style={title}>Livestreams</span> : null}
			<div style={{ overflow: 'hidden' }}>
				<div
					style={{
						overflowY: 'scroll',
						maxHeight: `${
							loadMore ? `${getWidth()}` : `${getNextWidth()}`
						}`,
						// maxHeight: `max(78vh, ${height})`,
						paddingRight: '4px',
						boxSizing: 'content-box',
						// border: '1px solid red',
					}}>
					{liveStreams.slice(0, limit).map((liveStream) => (
						<Feed event={liveStream} key={liveStream.id} />
					))}

					{loadMore &&
						liveStreams
							.slice(limit)
							.map((liveStream) => (
								<Feed event={liveStream} key={liveStream.id} />
							))}
				</div>
			</div>
			{liveStreams.length > limit && !loadMore ? (
				<div className='mt-2'>
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
