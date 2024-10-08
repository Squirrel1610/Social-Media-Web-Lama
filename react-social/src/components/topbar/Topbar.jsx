import {
	FaSearch,
	FaRegUserCircle,
	FaFacebookMessenger,
	FaBell,
} from "react-icons/fa";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
	const { user } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="logo">Lamasocial</span>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="searchbar">
					<FaSearch className="searchIcon" />
					<input
						placeholder="Search for friends, posts or videos"
						className="searchInput"
					/>
				</div>
			</div>
			<div className="topbarRight">
				<div className="topbarLinks">
					<span className="topbarLink">Homepage</span>
					<span className="topbarLink">Timeline</span>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<FaRegUserCircle className="topbarIconItemLink" />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<FaFacebookMessenger className="topbarIconItemLink" />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<FaBell className="topbarIconItemLink" />
						<span className="topbarIconBadge">1</span>
					</div>
				</div>
				<Link to={`/profile/${user.username}`}>
					<img
						className="topbarImg"
						src={PF + (user.profilePicture || "fb.jpg")}
						alt=""
					></img>
				</Link>
			</div>
		</div>
	);
}
