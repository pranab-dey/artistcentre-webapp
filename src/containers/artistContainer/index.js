import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ArtistContainer(props) {
	const { topEvent } = props;

	return (
		<Container style={container}>
			<Row>
				<Col md={12} xs={12}>
					<ArtistImage
						eventImageSrc={topEvent?.event_image_url ?? null}
					/>
				</Col>
				<Col md={12} xs={12}>
					<Title group={topEvent.group[0]} />
				</Col>
				<Col md={12} xs={12}>
					<Description group={topEvent.group[0]} />
				</Col>
			</Row>
		</Container>
	);
}

const ArtistImage = ({ eventImageSrc }) => {
	return (
		<div style={imgContainer}>
			<Image
				src={eventImageSrc || '/assets/no-image.jpeg'}
				alt=''
				title=''
				width={'140'}
				height={'85'}
				layout='responsive'
				objectFit='cover'
				style={{
					boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
					paddingBottom: '25px',
					borderRadius: '15px',
					border: '1px solid red',
				}}
			/>
		</div>
	);
};
const Title = ({ group }) => {
	return (
		<div style={titleContainer}>
			<span>{group.group_name}</span>
		</div>
	);
};
const Description = ({ group }) => {
	return (
		<div style={descriptionContainer}>
			<span>{group.group_biography}</span>
		</div>
	);
};

const container = {
	padding: '30px 20px',
	borderRadius: '15px',
	boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
	backgroundColor: 'var(--color-bnw)',
	maxHeight: '61vh',
	minHeight: '61vh',
	overflow: 'scroll',
};
const imgContainer = {};
const descriptionContainer = {
	fontSize: '10px',
	lineHeight: '17px',
	fontFamily: 'Roboto',
	overflow: 'hidden',
	color: 'var(--color-grey)',
	// maxHeight: '32vh',
	whiteSpace: 'pre-line' /* don't break the line */,
	textOverflow: 'ellipsis',
	textAlign: 'center',
	letterSpacing: '0.1px',
	fontWeight: '300',
};
const titleContainer = {
	fontSize: '18px',
	fontFamily: 'Poppins',
	color: 'var(--color-bnw-revert)',
	fontWeight: '800',
	textAlign: 'center',
	padding: '20px',
};
