import "./share.css";
import { FaImages, FaTag, FaMapMarkerAlt, FaRegGrin } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
	const { user } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const descRef = useRef();
	const [file, setFile] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newPost = {
				userId: user._id,
				desc: descRef.current.value,
			};

			if (file) {
				const form = new FormData();
				const fileName = Date.now() + file.name;
				form.append("name", fileName);
				form.append("file", file);
				newPost.img = fileName;
				try {
					await axios.post("/upload", form);
				} catch (error) {
					console.log(error);
				}
			}
			await axios.post("/posts", newPost);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						className="shareProfileImg"
						src={PF + (user.profilePicture || "fb.jpg")}
						alt=""
					/>
					<input
						placeholder={"What's in your mind?, " + user.username}
						className="shareInput"
						ref={descRef}
					/>
				</div>
				<hr className="shareHr" />
				<form className="shareBottom" onSubmit={handleSubmit}>
					<div className="shareOptions">
						<label htmlFor="file" className="shareOption">
							<FaImages className="shareIcon" />
							<span className="shareOptionText">
								Photo or Video
							</span>
							<input
								style={{ display: "none" }}
								type="file"
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
						<div className="shareOption">
							<FaTag className="shareIcon" />
							<span className="shareOptionText">Tag</span>
						</div>
						<div className="shareOption">
							<FaMapMarkerAlt className="shareIcon" />
							<span className="shareOptionText">Location</span>
						</div>
						<div className="shareOption">
							<FaRegGrin className="shareIcon" />
							<span className="shareOptionText">Feelings</span>
						</div>
					</div>
					<button className="shareButton" type="submit">
						Share
					</button>
				</form>
			</div>
		</div>
	);
}
