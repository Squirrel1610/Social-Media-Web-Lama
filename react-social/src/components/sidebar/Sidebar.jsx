import { FaWifi, FaFacebookMessenger, FaFileVideo, FaUsers, FaRegBookmark, FaQuestionCircle, FaBriefcase, FaCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa';

import './sidebar.css';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className='sidebarList'>
                    <li className="sidebarListItem">
                        <FaWifi className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaFacebookMessenger className="sidebarIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaFileVideo className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaUsers className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaRegBookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaQuestionCircle className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaBriefcase className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaCalendarAlt className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaChalkboardTeacher className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className='sidebarFriendList'>
                    {
                        Users.map(u => (
                            <CloseFriend key={u.id} user={u} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
