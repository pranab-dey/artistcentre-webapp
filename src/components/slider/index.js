import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper';
import styles from './slider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Slider(props) {
	const { type } = props;
	const router = useRouter();

	const conditionalImageFooter = (type, { artistName, title }) => {
		switch (type) {
			case 'Featured Livestreams':
				return (
					<div>
						<div className={styles.imageTitle}>
							<span>{title}</span>
						</div>
						<div className={styles.subTitle}>{artistName}</div>
					</div>
				);

			case 'Groups':
			case 'Artists':
				return (
					<div className=''>
						<div className={styles.groupTitle}>
							<span>{title}</span>
						</div>
					</div>
				);

			case 'Venues':
				return <div className={styles.venue}>{title}</div>;

			default:
				return;
		}
	};
	const buildSlides = (props) => {
		const { type, data } = props;

		return data?.map((slide) => {
			return (
				<SwiperSlide
					key={slide.id}
					className={styles.swiperContainer}
					onClick={(e) => handleClick(e, slide.id)}>
					<div>
						<Image
							src={
								slide.event_image_url ||
								slide.group_image_url ||
								slide.artist_image ||
								slide.profile_picture ||
								slide.venue_image ||
								'/assets/no-image.jpeg'
							}
							width={'300px'}
							height={'200px'}
							layout='responsive'
							objectFit='cover'
							alt={`image-slide-for-${slide.id}`}
							className={styles.slideImage}
						/>
					</div>
					{conditionalImageFooter(type, {
						title:
							slide.event_name ||
							slide.group_name ||
							slide.artist_name ||
							slide.venue_name ||
							'Unknown',
						artistName: slide.artist?.[0].artist_name ?? '',
					})}
				</SwiperSlide>
			);
		});
	};
	const handleClick = (e, id) => {
		e.preventDefault();
		if (type.toLowerCase().includes('featured'))
			router.push(`/events/${id}`);
		else {
			const url = `/${type.toLowerCase()}/${id}`;
			router.push(url);
		}
	};

	return (
		<Swiper
			slidesPerView={3}
			spaceBetween={30}
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			className='mySwiper swiper'>
			{buildSlides(props)}
		</Swiper>
	);
}
