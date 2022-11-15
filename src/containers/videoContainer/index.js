import Image from 'next/image';

export default function VideoContainer(props) {
	const { topEvent } = props;

	return (
		<div style={{ width: '100%' }}>
			<Image
				src={topEvent.event_image_url ?? '/assets/no-image.jpeg'}
				alt=''
				title=''
				width={'140'}
				height={'85'}
				layout='responsive'
				objectFit='cover'
				style={{
					boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
					paddingBottom: '25px',
					borderRadius: '5px',
				}}
				// className={styles.image}
			/>
		</div>
	);
}
