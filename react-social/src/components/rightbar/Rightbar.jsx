import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";

export default function Rightbar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src={`${PF}/giang.jpg`}
                            alt=""
                        />
                        <span className="rightbarFollowingName">Giang Bui</span>
                    </div>
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
