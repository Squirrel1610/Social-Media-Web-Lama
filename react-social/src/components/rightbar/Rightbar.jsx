import './rightbar.css';
import Online from '../online/Online';
import { Users } from '../../dummyData';

export default function Rightbar({profile}) {
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src='/assets/gift.png' alt='' className='birthdayImg' />
                    <span className='birthdayText'>
                        <b>Thinh Nguyen</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>

                <img src='/assets/ad.png' alt='' className='rightbarAd' />
                <h4 className='rightbarTitle'>Online Friends</h4>
                <ul className='rightbarFriendList'>
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className='rightbarTitle'>User Information</h4>
                <div className='rightbarInfo'>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>City: </span>
                        <span className='rightbarInfoValue'>Ho Chi Minh City</span>
                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>From: </span>
                        <span className='rightbarInfoValue'>Nha Trang City</span>
                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Relationship: </span>
                        <span className='rightbarInfoValue'>Dating</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User's Friends</h4>
                <div className='rightbarFollowings'>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='./assets/giang.jpg' alt='' />
                        <span className='rightbarFollowingName'>Giang Bui</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className='rightbarWrapper'>
                {!profile ? <HomeRightbar /> : <ProfileRightbar />}
            </div>
        </div>
    )
}
