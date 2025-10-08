import { useEffect, useState } from 'react';
import './message.css';
import axios from 'axios';
import { format } from 'timeago.js';

export default function Message({ notOwn, message }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [sender, setSender] = useState(null);

	useEffect(() => {
		const getSenderInfo = async (id) => {
			const res = await axios.get(`/users?userId=${id}`);
			if (res.data.success === true) setSender(res.data.data);
		};

		getSenderInfo(message?.sender);
	}, [message?.sender]);

	return (
		<div className={notOwn ? 'message not-own' : 'message'}>
			<div className='messageTop'>
				<img className='messageImg' src={PF + (sender?.profilePicture || 'fb.jpg')} alt='' />
				<p className='messageText'>{message?.text}</p>
			</div>
			<div className='messageBottom'>{format(message?.updatedAt)}</div>
		</div>
	);
}
