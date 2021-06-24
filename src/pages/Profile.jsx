import { useParams } from "react-router-dom";

import { useMomentContext } from "../context/MomentsContext";
import Avatar from "../components/Avatar";
import defaultPhoto from "./../data/images/blueFlower.jpg";
import { AiFillCamera } from "react-icons/ai";
import { MdWork } from "react-icons/md"; // MdWork -- works at
import { IoSchoolSharp } from "react-icons/io5"; // IoSchoolSharp -- schooled
import { AiFillHome } from "react-icons/ai"; // AiFillHome -- lives
import { GoLocation } from "react-icons/go"; // GoLocation -- location
import { BsClock } from "react-icons/bs"; // BsClock -- joined
import { IoWifiSharp } from "react-icons/io5"; // IoWifiSharp -- followers
import { RiSignalTowerFill } from "react-icons/ri";
// RiSignalTowerFill -- following

const Profile = () => {
    let { id } = useParams();
    let { state } = useMomentContext();
    let { user } = state;
    // console.log(user);

    let about = [
        { icon: <MdWork />, text: `Works at `, value: `Living Spring` },
        {
            icon: <IoSchoolSharp />,
            text: `Went to`,
            value: ` Reality High School`,
        },
        { icon: <AiFillHome />, text: `Lives in `, value: `Oshogbo` },
        { icon: <GoLocation />, text: `From `, value: `Ilesha` },
        { icon: <BsClock />, text: `Joined `, value: `November 2017` },
        { icon: <IoWifiSharp />, text: `Followers `, value: `200` },
        { icon: <RiSignalTowerFill />, text: `Following `, value: `1` },
    ];
    return (
        <main data-page="profile">
            <section className="profile__detail-1">
                <div className="profile__detail-sub">
                    <figure className="user__coverPhoto">
                        <img src={defaultPhoto} alt="hello" />
                        <button className="user__coverPhoto-edit btn">
                            <span className="user__coverPhoto-edit-icon">
                                <AiFillCamera />
                            </span>
                            <span className="user__coverPhoto-edit-text">
                                edit cover pic
                            </span>
                        </button>
                    </figure>
                    <figure className="user__profilePic">
                        <img src={user.profilePic} alt="jjj" />
                        <button className="user__profilePic-edit btn">
                            <span>
                                <AiFillCamera />
                            </span>
                        </button>
                    </figure>
                </div>
                <div className="profile__detail-sub-1">
                    <h2 className="user__name">{user.name}</h2>
                    <p className="user__bio">{user.bio}</p>
                    <button className="btn user__bio-edit">edit bio</button>
                </div>
            </section>

            <section className="profile__detail-2">
                <div>
                    <section className="box user__about">
                        <h4>About</h4>
                        <ul className="user__about-detail">
                            {about.map((det) => (
                                <li
                                    key={det.text}
                                    className="iconText iconText-string iconText-vertical"
                                >
                                    <span>{det.icon}</span>
                                    <span>{det.text}</span>
                                    <span className="user__about-val">
                                        {det.value}
                                    </span>
                                </li>
                            ))}
                            <li>
                                <button className="btn user__about-edit">
                                    edit about
                                </button>
                            </li>
                        </ul>
                    </section>

                    <section className="box user__friends">
                        <header className="user__friends-title">
                            <div>
                                <h4>Friends</h4>
                                <span className="user__friends-number">
                                    (300)
                                </span>
                            </div>
                            <button className="btn user__friends-btn box">
                                view all
                            </button>
                        </header>
                        <ul>
                            <li></li>
                        </ul>
                    </section>
                </div>
                <div>moment</div>
            </section>
        </main>
    );
};

export default Profile;
