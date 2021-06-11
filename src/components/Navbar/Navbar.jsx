import { NavLink, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import HomeLogo from "../HomeLogo";
import Avatar from "../Avatar";
import mjImg from "./../../data/images/mj1.jpg";
import { logout } from "../../reducer/fetchActions";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";

const Navbar = () => {
    let { dispatch } = useMomentContext();
    let history = useHistory();
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    let links = [
        {
            name: "search",
            active: "false",
            icon: <BsSearch className="nav__icon" />,
        },
        {
            name: "notification",
            active: "false",
            icon: <IoMdNotifications className="nav__icon" />,
        },
        {
            name: "moment",
            active: "false",
            icon: <AiOutlinePlus className="nav__icon" />,
        },
    ];
    const navRef = useRef(null);

    const getCurrentScrollHeight = () => {
        // console.log(navRef.current);
        if (navRef.current) {
            let currentWindowScrollHeigth = window.pageYOffset;
            currentWindowScrollHeigth > 20
                ? navRef.current.classList.add("bg-color")
                : navRef.current.classList.remove("bg-color");
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", getCurrentScrollHeight);

        return () =>
            document.removeEventListener("scroll", getCurrentScrollHeight);
    }, []);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(user);
    const logoutUser = async (e) => {
        console.log("logging out");
        let res = await logout();
        if (res.status === "success") {
            console.log(res);
            dispatch({ type: actions.LOGOUT, payload: res });
            history.go(0);
        }
    };

    return (
        <nav className="nav" ref={navRef}>
            <div className="width">
                <HomeLogo />
                <ul className="nav__lists-main">
                    {links.map((link) => {
                        let { name, icon } = link;
                        return (
                            <li key={name}>
                                <NavLink
                                    to={`/${name}`}
                                    className={`btn nav__link`}
                                >
                                    {icon}
                                    <span className="nav__text">{name}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <ul className="nav__lists-sub">
                    {user ? (
                        <>
                            <li>
                                {/* <button className="btn btn__avatar">
                                    <Avatar src={mjImg} />
                                </button> */}
                                <NavLink
                                    to="/profile"
                                    className="btn btn__avatar"
                                >
                                    <Avatar src={mjImg} />
                                </NavLink>
                            </li>
                            <li>
                                {/* <NavLink to="/logout" className="btn btn__link">
                                    logout
                                </NavLink> */}
                                <button
                                    className="btn btn__link btn-logout logout"
                                    onClick={logoutUser}
                                >
                                    logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
