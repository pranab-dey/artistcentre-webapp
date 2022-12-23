// export async function getAllEvents() {
// 	const response = await fetch(
// 		'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/events.json'
// 	);
// 	const data = await response.json();

// 	const events = [];

// 	for (const key in data) {
// 		events.push({
// 			id: key,
// 			...data[key],
// 		});
// 	}

// 	return events;
// }

import axiosServerInstance from 'pages/api/axios';
import axios from 'axios';

export async function getData(url, token) {
	console.log(':: fetching data from :', url);

	// query URL without using browser cache
	const headers = {
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
		Expires: '0',
	};

	if (token) headers['Authorization'] = token;

	const response = await axios.get(url, { headers });

	return response.data;
}

// export async function getEventById(id) {
// 	const allEvents = await getAllEvents();
// 	return allEvents.find((event) => event.id === id);
// }

// export async function getFilteredEvents(dateFilter) {
// 	const { year, month } = dateFilter;

// 	const allEvents = await getAllEvents();

// 	let filteredEvents = allEvents.filter((event) => {
// 		const eventDate = new Date(event.date);
// 		return (
// 			eventDate.getFullYear() === year &&
// 			eventDate.getMonth() === month - 1
// 		);
// 	});

// 	return filteredEvents;
// }
