import { FaSearch, FaRegUserCircle, FaFacebookMessenger, FaBell } from 'react-icons/fa';
import './topbar.css';

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Lamasocial</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <FaSearch className="searchIcon" />
                    <input placeholder="Search for friends, posts or videos" className="searchInput" />
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <span className='topbarLink'>Homepage</span>
                    <span className='topbarLink'>Timeline</span>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <FaRegUserCircle className='topbarIconItemLink'/>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <FaFacebookMessenger className='topbarIconItemLink'/>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <FaBell className='topbarIconItemLink'/>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <img className='topbarImg' src='../../assets/fb.jpg' alt=''></img>
            </div>
        </div>
    )
}