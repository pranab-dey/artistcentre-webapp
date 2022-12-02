import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import styles from 'styles/Detail.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

export default function SearchLivestreamContainer(props) {
	const { detail = [] } = props;
	const router = useRouter();
	// console.log(props);

	return (
		<>
			<div style={feature}>
				<span style={title} className='p-2'>
					Featured LiveStreams
				</span>
			</div>
			<Container>
				<Row className='mt-3'>
					<Col>
						{detail.slice(0, 3).map((liveStream, id) => {
							return (
								<div
									style={{ cursor: 'pointer' }}
									key={id}
									onClick={() =>
										router.push(`/events/${liveStream.id}`)
									}>
									<ArtistImage
										src={liveStream.event_image_url}
									/>
									<Title eventName={liveStream.event_name} />
									<Description
										artistName={liveStream.artist[0]}
									/>
								</div>
							);
						})}
					</Col>
				</Row>
			</Container>
		</>
	);
}

const ArtistImage = ({ src }) => {
	return (
		<div style={imgContainer}>
			<Image
				src={src || '/assets/no-image.jpeg'}
				alt=''
				title=''
				width={'140'}
				height={'70'}
				layout='responsive'
				objectFit='cover'
				style={{
					boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
					paddingBottom: '25px',
					borderRadius: '15px',
				}}
			/>
		</div>
	);
};

const Title = ({ eventName }) => {
	return (
		<div style={titleContainer}>
			<span>{eventName}</span>
		</div>
	);
};
const Description = ({ artistName }) => {
	return (
		<div style={descriptionContainer}>
			<span>{artistName?.artist_name}</span>
		</div>
	);
};

const container = {
	padding: '30px 20px',
	borderRadius: '15px',
	boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
	backgroundColor: 'var(--color-bnw)',
	maxHeight: '100vh',
	overflow: 'scroll',
	border: '1px solid red',
};

const feature = {
	paddingTop: '25px',
};

const title = {
	fontSize: '16px',
	fontFamily: 'Poppins',
	fontWeight: 'bold',
	color: 'var(--color-bnw-revert)',
};
const imgContainer = {};

const descriptionContainer = {
	fontSize: '12px',
	lineHeight: '17px',
	fontFamily: 'Roboto',
	overflow: 'hidden',
	color: 'var(--color-grey)',
	textOverflow: 'ellipsis',
	textAlign: 'start',
	letterSpacing: '0.1px',
	fontWeight: '300',
	paddingBottom: '11px',
};
const titleContainer = {
	fontSize: '15px',
	fontFamily: 'Poppins',
	color: 'var(--color-bnw-revert)',
	fontWeight: '800',
	textAlign: 'start',
	paddingTop: '7px',
};
