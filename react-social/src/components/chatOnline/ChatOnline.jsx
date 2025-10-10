import { useState } from 'react';
import './chatOnline.css';
import { useEffect } from 'react';
import axios from 'axios';

export default function ChatOnline({ onlineUsers, currentUser, setCurrentChat }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState([]);
	const [onlineFriends, setOnlineFriends] = useState([]);

	const handleClick = async (user) => {
		try {
			const res = await axios.get(`/conversations/find/${currentUser}/${user._id}`);
			setCurrentChat(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const getFriends = async (id) => {
			try {
				const res = await axios.get('/users/friends/' + id);
				setFriends(res.data.data);
			} catch (e) {
				console.log(e);
			}
		};
		getFriends(currentUser);
	}, [currentUser]);

	useEffect(() => {
		setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
	}, [friends, onlineUsers]);

	return (
		<div className='chatOnline'>
			{onlineFriends.map((f) => (
				<div key={f._id} className='chatOnlineFriend' onClick={(e) => handleClick(f)}>
					<div className='chatOnlineImgContainer'>
						<img className='chatOnlineImg' src={PF + (f.profilePicture || 'fb.jpg')} alt='' />
						<div className='chatOnlineBadge'></div>
					</div>
					<span className='chatOnlineName'>{f?.username}</span>
				</div>
			))}
		</div>
	);
}
