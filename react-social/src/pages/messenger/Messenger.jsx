import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function Messenger() {
	const { user } = useContext(AuthContext);
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messagesOfCurrentChat, setMessagesOfCurrentChat] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const scrollRef = useRef();
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const getConversationOfUser = async () => {
			try {
				const res = await axios.get(`/conversations/${user._id}`);
				if (res.data.success === true) setConversations(res.data.data);
			} catch (e) {
				console.log(e);
			}
		};

		getConversationOfUser();
	}, [user._id]);

	useEffect(() => {
		const getMessagesOfCurrentChat = async (id) => {
			const res = await axios.get(`/messages/${id}`);
			if (res.data.success === true) setMessagesOfCurrentChat(res.data.data);
		};

		getMessagesOfCurrentChat(currentChat?._id);
	}, [currentChat?._id]);

	const handleSubmitNewMessage = async (e) => {
		e.preventDefault();

		const data = {
			conversationId: currentChat?._id,
			sender: user._id,
			text: newMessage,
		};

		try {
			const res = await axios.post('/messages', data);
			if (res.data.success === true) {
				setMessagesOfCurrentChat([...messagesOfCurrentChat, res.data.data]);
				setNewMessage('');
			}
		} catch (error) {
			console.log(e);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messagesOfCurrentChat]);

	useEffect(() => {
		setSocket(io('ws://localhost:5005'));
	}, []);

	return (
		<>
			<Topbar />
			<div className='messenger'>
				<div className='chatMenu'>
					<div className='chatMenuWrapper'>
						<input placeholder='Search for friends' className='chatMenuInput' />
					</div>
					{conversations.map((c) => (
						<div key={c._id} onClick={() => setCurrentChat(c)}>
							<Conversation conversation={c} currentUser={user} />
						</div>
					))}
				</div>
				<div className='chatBox'>
					<div className='chatBoxWrapper'>
						{currentChat ? (
							<>
								<div className='chatBoxTop'>
									{messagesOfCurrentChat.map((message) => (
										<div ref={scrollRef}>
											<Message key={message?._id} message={message} notOwn={message?.sender !== user?._id} />
										</div>
									))}
								</div>
								<div className='chatBoxBottom'>
									<textarea
										className='chatMessageInput'
										placeholder='write something...'
										onChange={(e) => setNewMessage(e.currentTarget.value)}
										value={newMessage}
									></textarea>
									<button className='chatSubmitButton' onClick={(e) => handleSubmitNewMessage(e)}>
										Send
									</button>
								</div>
							</>
						) : (
							<span className='noConversationText'>Open a conversation</span>
						)}
					</div>
				</div>
				<div className='chatOnline'>
					<div className='chatOnlineWrapper'>
						<ChatOnline />
					</div>
				</div>
			</div>
		</>
	);
}
