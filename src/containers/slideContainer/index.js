import { Slider } from 'components';

export default function SlideContainer(props) {
	const { type = 'feature', slideContent } = props;

	return (
		<div style={style}>
			<h5 style={title}>{type}</h5>
			<div style={slider}>
				<Slider data={slideContent} type={type} />
			</div>
		</div>
	);
}

const style = {
	marginTop: '10px',
};
const title = {
	fontFamily: 'Poppins',
	marginBottom: '14px',
	fontWeight: 'bold',
	fontSize: '17px',
	lineHeight: '22px',
	color: 'var(--color-text-2)',
};
const slider = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginTop: '10px',
};
