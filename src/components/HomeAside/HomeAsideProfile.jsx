import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
// import { BiUserPlus } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
// import { BsInfoCircle, BsEyeFill, BsPerson } from "react-icons/bs";
import { BsInfoCircle, BsEyeFill } from "react-icons/bs";
import { useMomentContext } from "../../context/MomentsContext";
// import Avatar from "../Avatar";

import { ImTwitter } from "react-icons/im";
import { VscGithubInverted } from "react-icons/vsc";
import { GrFacebook } from "react-icons/gr";
import { SiLinkedin } from "react-icons/si";
import { BsPerson } from "react-icons/bs";

const HomeAsideProfile = () => {
    let { state } = useMomentContext();
    let { user } = state;

    let lists = [
        {
            text: "Home",
            icon: <AiOutlineHome className="nav__icon" />,
            link: "/",
        },
        { text: "FAQ", icon: <FaQuestion className="nav__icon" /> },
        { text: "About", icon: <BsInfoCircle className="nav__icon" /> },
        {
            text: "Terms of Use",
            icon: <BsEyeFill className="nav__icon" />,
            link: "terms",
        },
    ];

    if (user)
        lists.splice(1, 0, {
            text: "Profile",
            icon: <BsPerson className="nav__icon" />,
            link: `profile/${user._id}`,
        });

    let socialmedia = [
        {
            icon: <GrFacebook />,
            text: "facebook",
            link: "https://web.facebook.com/blessing.olaleye.378/",
        },
        {
            icon: <ImTwitter />,
            text: "twitter",
            link: "https://twitter.com/OlaleyeBlessin7",
        },
        {
            icon: <VscGithubInverted />,
            text: "github",
            link: "https://github.com/Olaleye-Blessing",
        },
        {
            icon: <SiLinkedin />,
            text: "linkedin",
            link: "https://www.linkedin.com/in/blessing-olaleye-139a22204/",
        },
    ];
    return (
        <>
            {!user && (
                <div className="home__nav-auth">
                    <p>
                        <span>MOMENT</span> is a place of where users can save
                        their special moments for others to see. Users can come
                        back to view and enjoy their old Moments
                    </p>
                    <ul>
                        <li>
                            <NavLink
                                to="/auth/login"
                                className="btn btn__link nav__link login"
                            >
                                login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/auth/signup"
                                className="btn btn__link signup"
                            >
                                signup
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
            <ul className="home__nav">
                {lists.map((list) => {
                    let { text, icon, link } = list;
                    return (
                        <li key={text}>
                            <Link
                                // to={`/${link || text}`}
                                to={text === "Home" ? "/" : `/${link || text}`}
                                className="btn nav__link"
                            >
                                {icon}
                                <span>{text}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <ul className="home__nav home__nav-media">
                {socialmedia.map((media) => {
                    let { text, icon, link } = media;
                    return (
                        <li key={text}>
                            <a
                                href={link}
                                title={text}
                                className={`btn ${text}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {icon}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <ul className="home__nav-tags">
                <h3>Popular Tags</h3>
            </ul>
        </>
    );
};

export default HomeAsideProfile;

// {/* <li>
//     {user ? (
//         <>
//             {user.profilePic ? (
//                 <Avatar src={user.profilePic} />
//             ) : (
//                 <figure className="avatar__icon">
//                     <BsPerson />
//                 </figure>
//             )}
//             <span>profile</span>
//         </>
//     ) : (
//         <>
//             <BiUserPlus /> <span>Signup/Login</span>
//         </>
//     )}
// </li> */}
