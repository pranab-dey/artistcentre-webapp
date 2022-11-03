import Image from 'next/image';

export default function VideoContainer(props) {
	const { topEvent } = props;

	return (
		<div style={{ width: '100%' }}>
			<Image
				src={topEvent.event_image_url}
				alt=''
				title=''
				width={'140'}
				height={'85'}
				layout='responsive'
				objectFit='cover'
				style={{ paddingBottom: '25px' }}
				// className={styles.image}
			/>
		</div>
		//className={styles.imageContainer}
		// <div
		// 	style={{
		// 		height: '552px',

		// 		backgroundColor: 'black',
		// 		marginBottom: '17px',
		// 	}}></div>
	);
}
