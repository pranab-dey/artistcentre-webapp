import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Calendar } from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import classes from './header.module.scss';
import styles from './calender.module.scss';

export default function Calender() {
	const router = useRouter();

	// date state
	const [calendar, setCalendar] = useState('Select Date');
	// open close
	const [open, setOpen] = useState(false);
	// get the target element to toggle
	const refOne = useRef(null);

	const handleCalenderClicked = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setOpen(true);
	};

	useEffect(() => {
		// set current date on component load
		// setCalendar(format(new Date(), 'MM/dd/yyyy'));
		// event listeners
		document.addEventListener('keydown', hideOnEscape, true);
		document.addEventListener('click', hideOnClickOutside, true);

		return () => {
			document.removeEventListener('click', hideOnClickOutside);
			document.removeEventListener('keydown', hideOnEscape);
		};
	}, []);

	// hide dropdown on ESC press
	const hideOnEscape = (e) => {
		// console.log(e.key)
		if (e.key === 'Escape') {
			setOpen(false);
		}
	};

	// Hide on outside click
	const hideOnClickOutside = (e) => {
		// console.log(refOne.current)
		// console.log(e.target)
		if (refOne.current && !refOne.current.contains(e.target)) {
			setOpen(false);
		}
	};

	// on date change, store date in state
	const handleSelect = (date) => {
		// console.log(date)
		// console.log(format(date, 'MM/dd/yyyy'))
		const selectedDate = format(date, 'yyyy-MM-dd');
		setCalendar(selectedDate);

		setOpen(false);
		router.push(
			{
				pathname: '/search',
				query: { event_date: selectedDate },
			},
			'/search'
		);
	};

	return (
		<div className={styles.calendarWrap}>
			<h6 className={classes.margin}>{calendar}</h6>
			<div
				className={classes.calenderIcon}
				onClick={handleCalenderClicked}>
				<Image
					src='/assets/calendar-week.png'
					width={100}
					height={100}
				/>
			</div>

			<div ref={refOne}>
				{open && (
					<Calendar
						date={new Date()}
						onChange={handleSelect}
						className={styles.calendarElement}
					/>
				)}
			</div>
		</div>
	);
}

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// import styles from './calender.module.scss';

// export default function Calender() {
// 	const [value, onChange] = useState(new Date());

// 	return (
// 		<div className={styles.calender}>
// 			<div className={styles.calender__container}>
// 				<main className={styles.calender__container__content}>
// 					<Calendar onChange={onChange} value={value} />
// 				</main>
// 			</div>
// 		</div>
// 	);
// }
