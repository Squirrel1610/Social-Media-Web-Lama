import { useEffect, useState } from 'react';
import './conversation.css';
import axios from 'axios';

export default function Conversation({ conversation, currentUser }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState(null);

	useEffect(() => {
		const friendId = conversation.members.find((member) => member !== currentUser._id);
		const getUserInfo = async (id) => {
			const res = await axios.get(`/users?userId=${id}`);
			if (res.data.success === true) setUser(res.data.data);
		};

		getUserInfo(friendId);
	}, [conversation.members, currentUser._id]);

	return (
		<div className='conversation'>
			<img className='conversationImg' src={PF + (user?.profilePicture || 'fb.jpg')} alt='' />
			<span className='conversationName'>{user?.username}</span>
		</div>
	);
}
