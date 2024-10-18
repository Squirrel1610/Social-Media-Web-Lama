import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Rightbar({ profile }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState([]);
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [followed, setFollowed] = useState();

	useEffect(() => {
		setFollowed(currentUser.followings.includes(profile?._id))
	}, [currentUser, profile?._id])

	useEffect(() => {
		const getFriends = async () => {
			try {
				const res = await axios.get("/users/friends/" + profile._id);
				setFriends(res.data.data);
			} catch (error) {
				console.log(error);
			}
		};

		getFriends();
	}, [profile]);

	const handleClick = async () => {
		try {
			if(followed) {
				await axios.put(`/users/${profile._id}/unfollow`, {
					currentUserId: currentUser._id
				})
				dispatch({type: "UNFOLLOW", payload: profile._id})
			} else {
				await axios.put(`/users/${profile._id}/follow`, {
					currentUserId: currentUser._id,
				});
				dispatch({ type: 'FOLLOW', payload: profile._id });
			}

			setFollowed(!followed);
		} catch (error) {
			console.log(error);
		}
	};

	const HomeRightbar = () => {
		return (
			<>
				<div className="birthdayContainer">
					<img src={PF + "gift.png"} alt="" className="birthdayImg" />
					<span className="birthdayText">
						<b>Thinh Nguyen</b> and <b>3 other friends</b> have a
						birthday today
					</span>
				</div>

				<img src={PF + "ad.png"} alt="" className="rightbarAd" />
				<h4 className="rightbarTitle">Online Friends</h4>
				<ul className="rightbarFriendList">
					{Users.map((u) => (
						<Online key={u.id} user={u} />
					))}
				</ul>
			</>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				{profile._id !== currentUser._id && (
					<button
						className="rightbarFollowButton"
						onClick={handleClick}
					>
						{followed ? "Unfollow": "Follow"}
					</button>
				)}
				<h4 className="rightbarTitle">User Information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City: </span>
						<span className="rightbarInfoValue">
							{profile.city}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">From: </span>
						<span className="rightbarInfoValue">
							{profile.from}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship: </span>
						<span className="rightbarInfoValue">
							{profile.relationship === 1
								? "Single"
								: profile.relationship === 2
								? "Married"
								: "-"}
						</span>
					</div>
				</div>
				<h4 className="rightbarTitle">User's Friends</h4>
				<div className="rightbarFollowings">
					{friends.map((friend) => (
						<Link
							key={friend._id}
							to={"/profile/" + friend.username}
							style={{ textDecoration: "none" }}
						>
							<div className="rightbarFollowing">
								<img
									className="rightbarFollowingImg"
									src={
										PF + (friend.profilePicture || "fb.jpg")
									}
									alt={friend.username}
								/>
								<span className="rightbarFollowingName">
									{friend.username}
								</span>
							</div>
						</Link>
					))}
				</div>
			</>
		);
	};

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{!profile ? <HomeRightbar /> : <ProfileRightbar />}
			</div>
		</div>
	);
}
