import React from 'react';
import { useRouter } from 'next/router';

function Caption({ text, linkText, href = '/' }) {
	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		router.push(href);
	};

	return (
		<div className='text-center'>
			<small>{text}</small>
			<a href={href} onClick={handleClick} className='link m-2'>
				<small>{linkText}</small>
			</a>
		</div>
	);
}

export default Caption;
