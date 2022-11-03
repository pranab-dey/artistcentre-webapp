import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import classes from './slider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';

const conditionalImageFooter = (type, { artistName, title }) => {
	switch (type) {
		case 'Featured Livestreams':
			return (
				<div>
					<div className={classes.imageTitle}>
						<span>{title}</span>
					</div>
					<div className={classes.subTitle}>{artistName}</div>
				</div>
			);

		case 'Groups':
		case 'Artists':
			return (
				<div className=''>
					<div className={classes.groupTitle}>
						<span>{title}</span>
					</div>
				</div>
			);

		case 'Venues':
			return <div className={classes.venue}>{title}</div>;

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
			{data?.map((i) => (
				<SwiperSlide key={i.id}>
					<div>
						<div
							style={{
								borderRadius: '15px',
								boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
								width: '300px',
								height: '200px',
							}}
							className='d-flex justify-content-space-around align-items-center'>
							<Image
								src={
									i.event_image_url ||
									i.group_image_url ||
									i.artist_image ||
									i.profile_picture ||
									i.venue_image ||
									'https://picsum.photos/1920/1080?random=1'
								}
								width={'300px'}
								height={'200px'}
								alt={`image-slide-for-${i.id}`}
								style={{
									borderRadius: '15px',
								}}
							/>
						</div>
						{conditionalImageFooter(type, {
							title:
								i.event_name ||
								i.group_name ||
								i.artist_name ||
								i.venue_name ||
								'Unknown',
							artistName: i.artist?.[0].artist_name ?? '',
						})}
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
