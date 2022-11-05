import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Detail } from 'components';

export default function GroupDetailContainer(props) {
	const { groupDetail } = props;

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
				Group
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
							src={groupDetail.group_image_url}
							alt='group_image'
							title={groupDetail.group_name}
							width={500}
							height={700}
							layout='responsive'
							objectFit='cover'
						/>
					</div>
				</Col>
				<Col xs={12} md={7} className='mt-4 p-3'>
					<Detail
						name={groupDetail.group_name}
						genre={groupDetail.group_genre}
						address={groupDetail.group_address}
						mobile={groupDetail.group_mobile}
						web={groupDetail.group_web_address}
						fb={groupDetail.group_social_media_fb_link}
						insta={groupDetail.group_social_media_insta_link}
						yt={groupDetail.group_social_media_yt_link}
					/>
				</Col>
			</Row>
		</Container>
	);
}
