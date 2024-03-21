import './share.css';
import { FaImages, FaTag, FaMapMarkerAlt, FaRegGrin } from 'react-icons/fa';

export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/fb.jpg" alt="" />
                    <input placeholder="What's in your mind?, Thinh Nguyen" className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <FaImages className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
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
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
 }
