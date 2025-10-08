import './chatOnline.css';

export default function ChatOnline() {
	return (
		<div className='chatOnline'>
			<div className='chatOnlineFriend'>
				<div className='chatOnlineImgContainer'>
					<img className='chatOnlineImg' src='http://localhost:5000/images/tai.jpg' alt='' />
					<div className='chatOnlineBadge'></div>
				</div>
				<span className='chatOnlineName'>Tai Nguyen</span>
			</div>
		</div>
	);
}
