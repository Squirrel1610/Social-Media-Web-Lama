import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const { username } = useParams();

    useEffect(() => {
        async function fetchUser() {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data.data);
        }
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    PF +
                                    (user.coverPicture || "cover_picture4.jpg")
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={PF + (user.profilePicture || "fb.jpg")}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">
                                {user.description}
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username} />
                        <Rightbar profile={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
