import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import classes from './slider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';

const conditionalImageFooter = (type) => {
	switch (type) {
		case 'Featured Livestreams':
			return (
				<div className='mb-0'>
					<div className={classes.imageTitle}>
						<span>Sucker</span>
					</div>
					<div className={classes.subTitle}>Jonas Brothers</div>
				</div>
			);

		case 'Groups':
		case 'Artists':
			return (
				<div className=''>
					<div className={classes.groupTitle}>
						<span>Sucker</span>
					</div>
				</div>
			);

		case 'Venues':
			return (
				<div className={classes.venue}>
					Jonas Brothers, Dhaka, Bangladesh
				</div>
			);

		default:
			return;
	}
};

export default function Slider(props) {
	const { type, data } = props;
	return (
		<Swiper
			slidesPerView={3}
			spaceBetween={30}
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			className='mySwiper'>
			{[1, 2, 3, 4, 6, 7, 8, 9, 10].map((i) => (
				<SwiperSlide>
					<div>
						<div
							style={{
								borderRadius: '15px',
								// border: '1px solid red',
								boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
								width: '300px',
								height: '200px',
								// minWidth: '100px',
							}}
							className='d-flex justify-content-space-around align-items-center'>
							<Image
								// className='d-block w-10'
								src='https://picsum.photos/1920/1080?random=1'
								width={'300px'}
								height={'200px'}
								// layout='responsive'
								alt='First slide'
								style={{
									borderRadius: '15px',
									// width: '100%',
									// height: '100%',
									// objectFit: 'fill',
								}}
							/>
						</div>
						{conditionalImageFooter(type)}
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
