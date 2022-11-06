import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Detail } from 'components';

export default function DetailContainer(props) {
	const { detail, type } = props;

	return (
		<Container
			fluid
			style={{
				background: 'var(--color-bnw)',
				marginTop: '20px',
				marginBottom: '20px',
				borderRadius: '15px',
				padding: '30px',
				boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
			}}>
			<span
				style={{
					fontFamily: 'Poppins',
					fontWeight: 'bold',
				}}>
				{type}
			</span>
			<Row>
				<Col xs={12} md={5}>
					<div
						style={{
							overflow: 'hidden',
							boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
							marginTop: '10px',
							height: 'auto',
							borderRadius: '5px 5px 15px 15px',
							display: 'block',
						}}>
						<Image
							src={
								detail.group_image_url ||
								detail.artist_image ||
								detail.venue_image ||
								'/assets/no-image.jpeg'
							}
							alt='detail_image'
							title={
								detail.group_name ||
								detail.artist_name ||
								detail.venue_name
							}
							width={500}
							height={700}
							layout='responsive'
							objectFit='cover'
						/>
					</div>
				</Col>
				<Col xs={12} md={7} className='mt-4 p-3'>
					<Detail
						name={
							detail.group_name ||
							detail.artist_name ||
							detail.venue_name
						}
						genre={
							detail.group_genre ||
							detail.artist_genre ||
							detail.venue_genre
						}
						address={
							detail.group_address ||
							detail.artist_address ||
							detail.venue_address
						}
						mobile={
							detail.group_mobile ||
							detail.artist_mobile ||
							detail.venue_mobile
						}
						web={
							detail.group_web_address ||
							detail.artist_web_address ||
							detail.venue_web_address
						}
						fb={
							detail.group_social_media_fb_link ||
							detail.artist_social_media_fb_link ||
							detail.venue_social_media_fb_link
						}
						insta={
							detail.group_social_media_insta_link ||
							detail.artist_social_media_insta_link ||
							detail.venue_social_media_insta_link
						}
						yt={
							detail.group_social_media_yt_link ||
							detail.artist_social_media_yt_link ||
							detail.venue_social_media_yt_link
						}
					/>
				</Col>
			</Row>
		</Container>
	);
}
